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



export const addComment = async (req, res) => {
    const { id } = req.params;
    const { text, userId } = req.body;
  
    try {
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newComment = {
        user: userId,
        text,
        time: new Date().toLocaleString(),
        replies: [],
      };
  
      post.comments.push(newComment);
      await post.save();
  
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const addReply = async (req, res) => {
    const { id, commentId } = req.params;
    const { text, userId } = req.body;
  
    try {
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const comment = post.comments.id(commentId);
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newReply = {
        user: userId,
        userName: user.name,
        text,
        time: new Date().toLocaleString(),
      };
  
      comment.replies.push(newReply);
      await post.save();
  
      res.status(201).json(newReply);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const likePost = async (req, res) => {
      const { id } = req.params;
      const { userId } = req.body;
    
      try {
        const post = await Post.findById(id);
    
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
          return res.status(400).json({ message: 'You have already liked this post' });
        }
    
        // Check if the user has disliked the post and remove the dislike
        if (post.dislikes.includes(userId)) {
          post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
        }
    
        // Add the user to the likes array
        post.likes.push(userId);
        await post.save();
    
        res.status(200).json(post);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
    
    export const dislikePost = async (req, res) => {
      const { id } = req.params;
      const { userId } = req.body;
    
      try {
        const post = await Post.findById(id);
    
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        // Check if the user has already disliked the post
        if (post.dislikes.includes(userId)) {
          return res.status(400).json({ message: 'You already disliked this post' });
        }
    
        // Check if the user has liked the post and remove the like
        if (post.likes.includes(userId)) {
          post.likes = post.likes.filter((id) => id.toString() !== userId);
        }
    
        // Add the user to the dislikes array
        post.dislikes.push(userId);
        await post.save();
    
        res.status(200).json(post);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  
 
    export const deletePost = async (req, res) => {
      const { id } = req.params;
    
      try {
        const post = await Post.findByIdAndDelete(id);
    
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        res.status(200).json({ message: 'Post deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  
  export  const deleteComment = (postId, commentId) => {
      axios
        .delete(`https://api.therhappy.site/api/post/${postId}/comment/${commentId}`)
        .then((response) => {
          // Remove the deleted comment from the local state
          const updatedPosts = posts.map((p) => {
            if (p._id === postId) {
              return {
                ...p,
                comments: p.comments.filter((c) => c._id !== commentId),
              };
            }
            return p;
          });
          setPosts(updatedPosts);
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
        });
    };
