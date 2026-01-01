import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // In production, files might be in a different location
    const filePath = path.join(process.cwd(), 'public', 'woof_rot13.txt');

    if (!fs.existsSync(filePath)) {
      // Try alternative paths
      const altPath = path.join(__dirname, '../../../public/woof_rot13.txt');
      if (fs.existsSync(altPath)) {
        const woofContent = fs.readFileSync(altPath, 'utf8').trim();
        return res.status(200).json({ content: woofContent });
      }
      return res.status(404).json({ message: 'Woof file not found' });
    }

    const woofContent = fs.readFileSync(filePath, 'utf8').trim();
    res.status(200).json({ content: woofContent });
  } catch (error) {
    console.error('Error reading woof file:', error);
    res.status(500).json({ message: 'Internal server error', error: String(error) });
  }
}