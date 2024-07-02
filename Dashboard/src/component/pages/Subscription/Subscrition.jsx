import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionCards from './SubscriptionCards';

function Subscription() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [price, setPrice] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    async function fetchSubscriptions() {
        try {
            const response = await axios.get('http://api.therhappy.site/api/subscription');
            setSubscriptions(response.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    function handlePrice(e) {
        setPrice(e.target.value);
    }

    function handleTime(e) {
        setTime(e.target.value);
    }

    async function createSubscription(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://api.therhappy.site/api/subscription/sub', { price, time });
            setSubscriptions([...subscriptions, response.data]); // Add new subscription to the list
            setPrice('');
            setTime('');
        } catch (error) {
            console.error(error.message);
        }
    }

    async function deleteSubscription(id) {
        try {
            await axios.get(`http://api.therhappy.site/api/subscription/delete/${id}`);
            setSubscriptions(subscriptions.filter(subscription => subscription._id !== id));
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className='px-10 py-10 h-screen overflow-scroll overflow-x-hidden'>
            <h1 className='mb-5 font-bold text-6xl'>Subscription</h1>
            <div className='w-[80%]'>
                <form onSubmit={createSubscription}>
                    <div className='grid'>
                        <label className='text-3xl'>Price</label>
                        <input type='text' value={price} placeholder='Price' onChange={handlePrice} className='p-3 mt-1' />
                    </div>
                    <div className='grid my-10'>
                        <label className='text-3xl'>Time</label>
                        <input type='text' value={time} placeholder='Time' onChange={handleTime} className='p-3 mt-1' />
                    </div>
                    <div>
                        <button type='submit' className='bg-green-300 py-3 px-7 text-xl text-white'>Create</button>
                    </div>
                </form>
            </div>

            <div className='mt-20'>
                <h1 className='text-3xl font-bold'>Subscriptions</h1>
                <div className='py-10 px-5 grid grid-cols-2 gap-10'>
                    {subscriptions.map((item) => (
                        <SubscriptionCards
                            key={item._id}
                            Price={item.price}
                            Time={item.time}
                            onDelete={() => deleteSubscription(item._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Subscription;
