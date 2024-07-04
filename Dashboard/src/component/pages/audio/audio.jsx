import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AudioPage = () => {
    const [audios, setAudios] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchAudios();
    }, []);

    const fetchAudios = async () => {
        const response = await axios.get(`${API}/audio`);
        setAudios(response.data);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('audio', file);
        formData.append('title', title);
        formData.append('description', description);

        await axios.post(`${API}/audio`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        fetchAudios();
        setTitle('');
        setDescription('');
        setFile(null);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API}/audio/${id}`);
        fetchAudios();
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Audio Management</h1>
            <form className="space-y-4 mb-8" onSubmit={handleCreate}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Upload
                </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {audios.map((audio) => (
                    <div key={audio._id} className="bg-white p-4 rounded shadow-md">
                        <h3 className="text-xl font-semibold mb-2">{audio.title}</h3>
                        <p className="mb-2">{audio.description}</p>
                        <audio controls src={audio.audioUrl} className="w-full mb-2"></audio>
                        <button
                            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            onClick={() => handleDelete(audio._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AudioPage;
