"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
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
    if ((allowedMimeTypes.includes(file.mimetype) && !isMimeEmptyOrOctetStream) ||
        (isMimeEmptyOrOctetStream && isVideoExt)) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type. Only JPG, PNG, WebP, MP4, and MOV are allowed.'));
    }
};
exports.uploadSingle = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // Giới hạn 20MB theo kế hoạch
    fileFilter: fileFilter,
}).single('file');
