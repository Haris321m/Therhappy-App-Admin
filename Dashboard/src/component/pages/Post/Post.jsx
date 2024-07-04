import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCards from './PostCards';

function Post() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const API=import.meta.env.VITE_API_URL;
    useEffect(() => {
        
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API}/post`);
            setPosts(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch posts');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('img', image);
        }

        try {
            const response = await axios.post(`${API}/post`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPosts([...posts, response.data]);
            clearForm();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/post/${id}`);
            setPosts(posts.filter(post => post._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete post');
        }
    };

    const clearForm = () => {
        setTitle('');
        setContent('');
        setImage(null);
    };

    return (
        <div className='px-10 h-screen overflow-scroll overflow-x-hidden scroll-smooth'>
            <h1 className='mt-10 font-bold text-6xl'>Posts</h1>
            <div>
                <form onSubmit={handleSubmit} className='my-10'>
                    <div className='grid mt-5'>
                        <label className='text-3xl'>Title</label>
                        <input
                            type="text"
                            placeholder='Title'
                            className='mt-1 p-3'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='grid mt-5'>
                        <label className='text-3xl'>Content</label>
                        <textarea
                            placeholder='Write Text...'
                            className='mt-1 h-56 overflow-scroll overflow-x-hidden p-3'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className='grid mt-5'>
                        <label className='text-3xl'>Import Image</label>
                        <input
                            type="file"
                            className='mt-1'
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div>
                        <button type='submit' className='py-3 px-7 mt-5 bg-green-400 text-white'>Create</button>
                    </div>
                </form>
                {error && <div className='text-red-500'>{error}</div>}
            </div>
            <div>
                <h1 className='text-3xl font-bold my-5'>Report comments</h1>
                {/* Add logic for displaying report comments */}
            </div>
            <div>
                <h1 className='text-3xl font-bold my-5'>Posts</h1>
                <div  className='grid grid-cols-3'>
                    {posts.map(post => (
                        <PostCards
                            key={post._id}
                            title={post.title}
                            content={post.content}
                            image={post.path}
                            onDelete={() => handleDelete(post._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Post;
