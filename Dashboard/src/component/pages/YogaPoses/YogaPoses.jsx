import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YogaPosesCards from './YogaPosesCards';

function YogaPoses() {
    const [poses, setPoses] = useState([]);
    const [title, setTitle] = useState('');
    const [video, setVideo] = useState(null);
    const [error, setError] = useState(null);
    const [selectedPose, setSelectedPose] = useState(null);

    useEffect(() => {
        fetchPoses();
    }, []);

    async function fetchPoses() {
        try {
            const response = await axios.get('http://api.therhappy.site/api/yoga-poses/');
            setPoses(response.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleCreateOrUpdatePose(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        if (video) {
            formData.append('video', video);
        }

        try {
            let response;
            if (selectedPose) {
                response = await axios.put(`http://api.therhappy.site/api/yoga-poses/${selectedPose._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setPoses(poses.map(pose => pose._id === selectedPose._id ? response.data : pose));
            } else {
                response = await axios.post('http://api.therhappy.site/api/yoga-poses', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setPoses([...poses, response.data]);
            }
            clearForm();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create or update pose');
            console.error(error.message);
        }
    }

    function clearForm() {
        setTitle('');
        setVideo(null);
        setSelectedPose(null);
    }

    async function handleDeletePose(id) {
        try {
            await axios.delete(`http://api.therhappy.site/api/yoga-poses/${id}`);
            setPoses(poses.filter(pose => pose._id !== id));
        } catch (error) {
            console.error(error.message);
        }
    }

    function handleEditPose(pose) {
        setTitle(pose.title);
        setVideo(null);  // Reset video as we can't edit the file input directly
        setSelectedPose(pose);
    }

    return (
        <div className='p-10 h-screen overflow-scroll overflow-x-hidden'>
            <h1 className='font-bold text-6xl'>Yoga Poses</h1>
            <div className='my-5'>
                <form onSubmit={handleCreateOrUpdatePose}>
                    <div className='grid'>
                        <label className='text-3xl'>Import Video</label>
                        <input type="file" className='mt-1' onChange={(e) => setVideo(e.target.files[0])} />
                    </div>
                    <div className='grid mt-10'>
                        <label className='text-3xl'>Title</label>
                        <input type="text" placeholder='Enter Title' className='mt-1 p-3' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <button type='submit' className='py-3 px-7 bg-green-400 text-white text-xl my-5'>{selectedPose ? 'Update' : 'Create'}</button>
                    </div>
                </form>
                {error && <div className='text-red-500'>{error}</div>}
            </div>
            <div>
                <div className='my-10'>
                    <h1 className='text-3xl font-bold'>Yoga Poses</h1>
                </div>
                <div className='grid grid-cols-3 gap-10'>
                    {poses.map((pose, index) => (
                        <YogaPosesCards 
                            key={index} 
                            video={pose.video} 
                            title={pose.title} 
                            onDelete={() => handleDeletePose(pose._id)}
                            onEdit={() => handleEditPose(pose)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default YogaPoses;
