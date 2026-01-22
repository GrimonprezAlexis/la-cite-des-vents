import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminDb } from '@/lib/firebase-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getAdminDb();

  if (req.method === 'GET') {
    try {
      const snapshot = await db
        .collection('menu_items')
        .orderBy('display_order', 'asc')
        .get();

      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Cache for 5 minutes, stale-while-revalidate for 1 hour
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
      return res.status(200).json(items);
    } catch (error: any) {
      console.error('Error fetching menu items:', error);
      return res.status(500).json({ error: error.message || 'Failed to fetch menu items' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, description, file_url, file_type, file_name, storage_path, display_order } = req.body;

      if (!title || !file_url || !storage_path) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const docRef = await db.collection('menu_items').add({
        title,
        description: description || '',
        file_url,
        file_type,
        file_name,
        storage_path,
        display_order: display_order || 0,
        created_at: new Date().toISOString(),
      });

      return res.status(201).json({ id: docRef.id });
    } catch (error: any) {
      console.error('Error creating menu item:', error);
      return res.status(500).json({ error: error.message || 'Failed to create menu item' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid id parameter' });
      }

      await db.collection('menu_items').doc(id).delete();

      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Error deleting menu item:', error);
      return res.status(500).json({ error: error.message || 'Failed to delete menu item' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
