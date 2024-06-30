import mongoose from 'mongoose';

const yogaPoseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    }
}, { timestamps: true });

const YogaPose = mongoose.model('YogaPose', yogaPoseSchema);

export default YogaPose;
