import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import {v2 as cloudinary} from "cloudinary";

export const createPost = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
         resource_type:"auto"
        });
        console.log('uploaded:', result);
    const path=result.secure_url;
    const { title, content, author } = req.body;
        const newPost = new Post({ title, content, author,path });
        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name email').populate({
            path: 'comments.user',
            select: 'name image'
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id).populate('author', 'name email').populate({
            path: 'comments.user',
            select: 'name image'
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
         resource_type:"auto"
        });
        console.log('uploaded:', result);
    
        
    
    const path=result.secure_url;
    
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content,path },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const addComment = async (req, res) => {
    const { postId } = req.params;
    const { text, userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = { text, user: userId,likes,dislikes };
        post.comments.push(comment);
        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = post.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.remove();
        await post.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
