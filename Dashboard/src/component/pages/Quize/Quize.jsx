import React from 'react';
import MCQs from './MCQs';

function Quize() {
    return (
        <div className='px-10 py-10 h-screen overflow-scroll overflow-x-hidden'>
            <div>
                <h1 className='font-bold text-6xl'>MCQs</h1>
                <MCQs />
            </div>
        </div>
    );
}

export default Quize;