import JournalEntry from '../models/journal.model.js';


export const createJournalEntry = async (req, res) => {
    try {
        const { content, mood, user } = req.body;

        const newJournalEntry = new JournalEntry({ content, mood, user });
        const savedJournalEntry = await newJournalEntry.save();

        res.status(201).json(savedJournalEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getJournalEntries = async (req, res) => {
    try {
        const journalEntries = await JournalEntry.find().populate('mood').populate('user');
        res.status(200).json(journalEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getJournalEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const journalEntry = await JournalEntry.findById(id).populate('mood').populate('user');

        if (!journalEntry) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }

        res.status(200).json(journalEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, mood, user } = req.body;

        const updatedJournalEntry = await JournalEntry.findByIdAndUpdate(
            id,
            { content, mood, user },
            { new: true, runValidators: true }
        );

        if (!updatedJournalEntry) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }

        res.status(200).json(updatedJournalEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedJournalEntry = await JournalEntry.findByIdAndDelete(id);

        if (!deletedJournalEntry) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }

        res.status(200).json({ message: 'Journal entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
