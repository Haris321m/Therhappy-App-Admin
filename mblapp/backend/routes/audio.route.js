import express from 'express';
import { createAudio, getAllAudios, getAudioById, updateAudio, deleteAudio } from '../controllers/audio.controller.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Specify the destination folder for uploaded files

router.post('/', upload.single('audio'), createAudio);
router.get('/', getAllAudios);
router.get('/:id', getAudioById);
router.put('/:id', upload.single('audio'), updateAudio);
router.delete('/:id', deleteAudio);

export default router;
