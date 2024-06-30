import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    audioUrl: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Audio = mongoose.model('Audio', audioSchema);

export default Audio;
