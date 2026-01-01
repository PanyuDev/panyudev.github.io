import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const filePath = path.join(process.cwd(), 'woof_rot13.txt');
    const woofContent = fs.readFileSync(filePath, 'utf8').trim();

    res.status(200).json({ content: woofContent });
  } catch (error) {
    console.error('Error reading woof file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}