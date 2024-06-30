import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    mood: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mood',
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

export default JournalEntry;
