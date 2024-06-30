import React from 'react';

function YogaPosesCards({ video, title, onDelete, onEdit }) {
    return (
        <div className='bg-orange-300 w-48 rounded-xl overflow-hidden'>
            <div>
                <video src={video} className='w-48 h-56 bg-black' controls></video>
            </div>
            <div className='p-3'>
                <h1>{title}</h1>
            </div>
            <div className='text-center py-3'>
                <button className='py-3 px-7 bg-red-400 text-white mr-2' onClick={onDelete}>Delete</button>
                <button className='py-3 px-7 bg-blue-400 text-white' onClick={onEdit}>Edit</button>
            </div>
        </div>
    );
}

export default YogaPosesCards;
