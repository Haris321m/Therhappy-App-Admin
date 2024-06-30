import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
});

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answers: {
        type: [answerSchema],
        required: true
    }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
