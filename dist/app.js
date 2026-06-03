"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const upload_middleware_1 = require("./middlewares/upload.middleware");
const upload_service_1 = require("./services/upload.service");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/api/v1/media/upload', (req, res) => {
    (0, upload_middleware_1.uploadSingle)(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file uploaded.' });
            }
            const result = await (0, upload_service_1.uploadToCloudinary)(req.file.buffer, 'convenience_store');
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
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
