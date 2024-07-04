import React, { useEffect, useState } from "react";
import EducationalCards from "./EducationalCards";
import axios from "axios";

function Educational() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const API=import.meta.env.VITE_API_URL;
  useEffect(() => {
    
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/article`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateOrUpdatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('img', image);
    }

    try {
      if (selectedPost) {
        await axios.put(`${API}/article/${selectedPost._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post(`${API}/article`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      fetchPosts();
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${API}/api/article/${id}`);
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setImage(null);  
    setSelectedPost(post);
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setImage(null);
    setSelectedPost(null);
  };

  return (
    <div className="p-10 h-screen overflow-scroll overflow-x-hidden scroll-smooth">
      <h1 className="text-3xl font-bold">Educational</h1>
      <div className="p-8">
        <form onSubmit={handleCreateOrUpdatePost}>
          <div className="grid">
            <label className="text-2xl">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              className="mt-1 p-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid mt-5">
            <label className="text-2xl">Import Image</label>
            <input
              type="file"
              className="mt-1"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="grid mt-5">
            <label className="text-2xl">Content</label>
            <textarea
              placeholder="Write Text...."
              className="p-3 h-40 overflow-scroll overflow-x-hidden"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="my-10 px-5 py-3 text-white bg-green-400 text-2xl" onClick={handleCreateOrUpdatePost}>
            {selectedPost ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl font-bold">Posts</h1>
        <div className="grid grid-cols-3 gap-10">
          {posts.map(post => (
            <EducationalCards
              key={post._id}
              title={post.title}
              content={post.content}
              image={post.imageUrl}
              onEdit={() => handleEditPost(post)}
              onDelete={() => handleDeletePost(post._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Educational;
