import express from 'express';
import {
    createJournalEntry,
    getJournalEntries,
    getJournalEntryById,
    updateJournalEntry,
    deleteJournalEntry
} from '../controllers/journal.controller.js';
import upload from '../middlewares/multer.middleware.js';
const router = express.Router();

router.post('/', createJournalEntry);
router.get('/', getJournalEntries);
router.get('/:id', getJournalEntryById);
router.put('/:id', updateJournalEntry);
router.delete('/:id', deleteJournalEntry);

export default router;
