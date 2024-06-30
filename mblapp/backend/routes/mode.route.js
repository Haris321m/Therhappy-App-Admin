import express from 'express';
import {
    createMood,
    getMoods,
    getMoodById,
    updateMood,
    deleteMood
} from '../controllers/mode.controller.js';
import upload from '../middlewares/multer.middleware.js';
const router = express.Router();

router.post('/', createMood);
router.get('/', getMoods);
router.get('/:id', getMoodById);
router.put('/:id', updateMood);
router.delete('/:id', deleteMood);

export default router;
