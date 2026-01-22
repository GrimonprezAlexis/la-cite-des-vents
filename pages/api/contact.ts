import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminDb } from '@/lib/firebase-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const db = getAdminDb();

  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await db.collection('contact_messages').add({
      name,
      email,
      phone: phone || '',
      subject,
      message,
      created_at: new Date().toISOString(),
    });

    return res.status(201).json({ success: true });
  } catch (error: any) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ error: error.message || 'Failed to save contact message' });
  }
}
