import multer from 'multer';
import { Request } from 'express';

const storage = multer.memoryStorage();
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/quicktime',
    'application/octet-stream'
  ];

  const fileExtension = file.originalname ? file.originalname.split('.').pop()?.toLowerCase() : '';
  const isVideoExt = fileExtension === 'mp4' || fileExtension === 'mov';
  const isMimeEmptyOrOctetStream = !file.mimetype || file.mimetype === 'application/octet-stream';

  if (
    (allowedMimeTypes.includes(file.mimetype) && !isMimeEmptyOrOctetStream) ||
    (isMimeEmptyOrOctetStream && isVideoExt)
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, WebP, MP4, and MOV are allowed.'));
  }
};

export const uploadSingle = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: fileFilter,
}).single('file');
