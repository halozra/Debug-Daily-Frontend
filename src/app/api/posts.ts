import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next'; // Import tipe dari Next.js

const postsFilePath = path.join(process.cwd(), 'public', 'db.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, image } = req.body;

    // Validasi data input
    if (!title || !description || !image) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Baca data lama dari db.json
    fs.readFile(postsFilePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal membaca data' });
      }

      const posts = JSON.parse(data);
      const newPost = { id: Date.now().toString(), title, description, image };
      
      // Menambahkan post baru ke dalam array
      posts.push(newPost);

      // Menyimpan kembali data ke db.json
      fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Gagal menyimpan data' });
        }

        return res.status(200).json({ message: 'Post berhasil ditambahkan' });
      });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
