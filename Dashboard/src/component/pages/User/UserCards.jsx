import React from 'react';

function UserCards(props) {
    return (
        <div className='bg-white w-60 text-center'>
            <div className='my-5'>
                <h1 className='text-3xl'>{props.name}</h1>
            </div>
            <div className='bg-orange-300 w-56 m-auto rounded-xl p-5'>
                <h1>Subscription</h1> 
                <h2>{new Date(props.StartTime).toLocaleDateString()}</h2>
                <h2>{new Date(props.TimeLeft).toLocaleDateString()}</h2>
            </div>
            <div className='py-5'>
                <button 
                    className='bg-red-500 text-white py-2 px-7 text-xl'
                    onClick={props.onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default UserCards;
