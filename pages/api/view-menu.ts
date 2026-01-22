import type { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { key } = req.query;

  if (!key || typeof key !== 'string') {
    return res.status(400).json({ error: 'Missing key parameter' });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set appropriate content type
    const contentType = response.ContentType || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);

    // Set content disposition for inline viewing
    const fileName = key.split('/').pop() || 'file';
    res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);

    // Cache for 1 hour
    res.setHeader('Cache-Control', 'private, max-age=3600');

    // Stream the file content
    const stream = response.Body as Readable;
    stream.pipe(res);
  } catch (error: any) {
    console.error('Error fetching file from S3:', error);
    return res.status(500).json({ error: 'Failed to fetch file' });
  }
}
