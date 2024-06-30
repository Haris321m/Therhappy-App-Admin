import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }]
}, { timestamps: true });

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
