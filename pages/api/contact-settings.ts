import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminDb } from '@/lib/firebase-admin';

const DEFAULT_SETTINGS = {
  phone: '022 797 10 70',
  email: process.env.CONTACT_EMAIL || '',
  announcement: '',
  announcement_active: false,
};

const SETTINGS_DOC_ID = 'main';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getAdminDb();
  const settingsRef = db.collection('settings').doc(SETTINGS_DOC_ID);

  if (req.method === 'GET') {
    try {
      const doc = await settingsRef.get();

      if (!doc.exists) {
        // Create default settings
        const now = new Date().toISOString();
        await settingsRef.set({
          ...DEFAULT_SETTINGS,
          created_at: now,
          updated_at: now,
        });
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json(DEFAULT_SETTINGS);
      }

      const data = doc.data();
      // Cache for 1 minute, stale-while-revalidate for 5 minutes
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
      return res.status(200).json({
        phone: data?.phone || DEFAULT_SETTINGS.phone,
        email: data?.email || DEFAULT_SETTINGS.email,
        announcement: data?.announcement || '',
        announcement_active: data?.announcement_active || false,
      });
    } catch (error: any) {
      console.error('Error fetching contact settings:', error);
      return res.status(500).json({ error: error.message || 'Failed to fetch settings' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { phone, email, announcement, announcement_active } = req.body;

      await settingsRef.set(
        {
          phone: phone || DEFAULT_SETTINGS.phone,
          email: email || DEFAULT_SETTINGS.email,
          announcement: announcement || '',
          announcement_active: announcement_active || false,
          updated_at: new Date().toISOString(),
        },
        { merge: true }
      );

      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Error updating contact settings:', error);
      return res.status(500).json({ error: error.message || 'Failed to update settings' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
