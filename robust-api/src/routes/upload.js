import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.resolve('./uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
});

router.route('/')
  .post(upload.single('file'), (req, res, next) => {
    // req.file has metadata;
    res.json({
      filename: req.file.filename,
      size: req.file.size,
    });
  });

export default router;