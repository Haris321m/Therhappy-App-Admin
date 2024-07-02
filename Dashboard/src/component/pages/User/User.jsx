import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCards from './UserCards';

function User() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://api.therhappy.site/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://api.therhappy.site/api/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='px-10 h-screen overflow-x-hidden overflow-scroll'>
            <h1 className='mt-10 text-6xl font-bold'>Users</h1>
            <div className='my-10 bg-white flex overflow-hidden rounded-xl'>
                <input 
                    type="text" 
                    placeholder='Search... ' 
                    className='w-[90%] p-3'
                    value={search}
                    onChange={handleSearchChange}
                />
                <button className='bg-blue-200 h-15 w-24 p-3'>Search</button>
            </div>
            <div className='grid grid-cols-3 gap-10 mb-10'>
                {filteredUsers.map((user) => (
                    <UserCards 
                        key={user._id}
                        name={user.name}
                        StartTime={user.subscriptionStart}
                        TimeLeft={user.subscriptionEnd}
                        onDelete={() => deleteUser(user._id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default User;
