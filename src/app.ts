import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { uploadSingle } from './middlewares/upload.middleware';
import { uploadToCloudinary } from './services/upload.service';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/v1/media/upload', (req: Request, res: Response) => {
  uploadSingle(req, res, async (err: any) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
      }
      const result = await uploadToCloudinary(req.file.buffer, 'convenience_store');
      return res.status(200).json({
        success: true,
        message: 'Upload media thành công.',
        data: {
          media_id: result.public_id,
          url: result.secure_url,
          resource_type: result.resource_type,
          format: result.format,
          size_bytes: result.bytes,
        },
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
