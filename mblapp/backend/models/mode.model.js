import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
    mood: {
        type: String,
        required: true
    },
    path:{
        type:String
    },
    comments: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Mood = mongoose.model('Mood', moodSchema);

export default Mood;
