import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminDb } from '@/lib/firebase-admin';

const DEFAULT_HOURS = [
  { day_of_week: 'Lundi', is_open: true, open_time: '07:30', close_time: '00:00', special_note: '', display_order: 1 },
  { day_of_week: 'Mardi', is_open: true, open_time: '07:30', close_time: '00:00', special_note: '', display_order: 2 },
  { day_of_week: 'Mercredi', is_open: true, open_time: '07:30', close_time: '00:00', special_note: '', display_order: 3 },
  { day_of_week: 'Jeudi', is_open: true, open_time: '07:30', close_time: '00:00', special_note: '', display_order: 4 },
  { day_of_week: 'Vendredi', is_open: true, open_time: '07:30', close_time: '00:00', special_note: '', display_order: 5 },
  { day_of_week: 'Samedi', is_open: true, open_time: '07:30', close_time: '00:00', special_note: '', display_order: 6 },
  { day_of_week: 'Dimanche', is_open: true, open_time: '07:30', close_time: '00:00', special_note: '', display_order: 7 },
];

async function initializeDefaultHours(db: FirebaseFirestore.Firestore): Promise<Array<{ id: string; [key: string]: any }>> {
  const now = new Date().toISOString();
  const createdHours: Array<{ id: string; [key: string]: any }> = [];

  // Create documents one by one to get their IDs immediately
  for (const hour of DEFAULT_HOURS) {
    const docRef = db.collection('opening_hours').doc();
    const hourData = {
      ...hour,
      created_at: now,
      updated_at: now,
    };
    await docRef.set(hourData);
    createdHours.push({ id: docRef.id, ...hourData });
  }

  return createdHours;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getAdminDb();

  if (req.method === 'GET') {
    try {
      // First try to get existing hours
      let snapshot = await db.collection('opening_hours').get();

      // If no hours exist, create default ones and return them directly
      if (snapshot.empty) {
        const createdHours = await initializeDefaultHours(db);
        // No cache for freshly created data
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json(createdHours);
      }

      // Sort by display_order in memory to avoid index requirement
      const hours = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0));

      // Cache for 5 minutes, stale-while-revalidate for 1 hour
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
      return res.status(200).json(hours);
    } catch (error: any) {
      console.error('Error fetching opening hours:', error);
      return res.status(500).json({ error: error.message || 'Failed to fetch opening hours' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { is_open, open_time, close_time, special_note } = req.body;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid id parameter' });
      }

      // Check if document exists first
      const docRef = db.collection('opening_hours').doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).json({ error: 'Document not found' });
      }

      await docRef.update({
        is_open,
        open_time,
        close_time,
        special_note: special_note || '',
        updated_at: new Date().toISOString(),
      });

      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Error updating opening hours:', error);
      return res.status(500).json({ error: error.message || 'Failed to update opening hours' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
