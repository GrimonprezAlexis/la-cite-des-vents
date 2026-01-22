import type { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { IncomingForm, File as FormidableFile } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const REGION = process.env.AWS_REGION;
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET = process.env.AWS_S3_BUCKET;

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID!,
    secretAccessKey: SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // 10 MB
    });

    const [fields, files] = await form.parse(req);

    const fileArray = files.file;
    if (!fileArray || fileArray.length === 0) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const file = fileArray[0] as FormidableFile;
    const originalFilename = file.originalFilename || 'file';
    const sanitizedFileName = originalFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `${Date.now()}_${sanitizedFileName}`;
    const storagePath = `menus/${fileName}`;

    const fileBuffer = fs.readFileSync(file.filepath);

    const params = {
      Bucket: BUCKET,
      Key: storagePath,
      Body: fileBuffer,
      ContentType: file.mimetype || 'application/octet-stream',
    };

    await s3.send(new PutObjectCommand(params));

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    const fileUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${storagePath}`;

    res.status(200).json({
      url: fileUrl,
      storagePath,
      fileName: originalFilename,
      fileType: file.mimetype,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Upload failed' });
  }
}
