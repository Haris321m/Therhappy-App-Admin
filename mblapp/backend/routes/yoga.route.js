import express from 'express';
import multer from 'multer';
import { createYogaPose, getYogaPoses, updateYogaPose, deleteYogaPose } from '../controllers/yoga.controller.js';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', upload.single('video'), createYogaPose);
router.get('/', getYogaPoses);
router.put('/:id', upload.single('video'), updateYogaPose);
router.delete('/:id', deleteYogaPose);

export default router;
