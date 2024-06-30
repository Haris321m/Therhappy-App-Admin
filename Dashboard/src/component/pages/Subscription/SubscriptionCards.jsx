import React from 'react';

function SubscriptionCards({ Price, Time, onDelete }) {
    return (
        <div className='bg-white p-5 rounded shadow'>
            <h2 className='text-2xl font-bold'>Price: {Price}</h2>
            <p className='text-xl'>Time: {Time}</p>
            <button onClick={onDelete} className='bg-red-500 text-white px-3 py-1 mt-3'>Delete</button>
        </div>
    );
}

export default SubscriptionCards;
