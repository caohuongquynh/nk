import { Router } from 'express';
import { handleMediaUpload } from './media.controller';
import { uploadSingle } from '../../shared/middleware/upload.middleware';

const router = Router();

// The base path prefix "/api/v1/media" is defined in app.ts
router.post('/upload', (req, res, next) => {
  uploadSingle(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}, handleMediaUpload);

export default router;
