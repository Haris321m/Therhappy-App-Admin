import mongoose from 'mongoose';
import { boolean, string } from 'zod';

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    newlike: {
        type: Boolean,  // Use Boolean type for boolean values
        default: false  // Set a default value if needed
    },
    dislikes: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    path:{
        type:String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [commentSchema] // Embed comments schema
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
