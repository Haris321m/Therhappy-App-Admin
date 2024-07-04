import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    relationshipstatus: '',
    number: '',
    issues: '',
    subscriptionDays: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = (name === 'number' || name === 'age' || name === 'subscriptionDays') ? parseInt(value, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccess('Signup successful!');
      setError('');
      console.log(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred.');
      setSuccess('');
      console.error(error);
    }
    setFormData({
      name: '',
      email: '',
      password: '',
      age: '',
      gender: '',
      relationshipstatus: '',
      number: '',
      issues: '',
      subscriptionDays: ''
    });
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="age" className="block text-gray-700 font-bold mb-2">Age</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Gender</label>
          <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="relationshipstatus" className="block text-gray-700 font-bold mb-2">Relationship Status</label>
          <input type="text" id="relationshipstatus" name="relationshipstatus" value={formData.relationshipstatus} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="number" className="block text-gray-700 font-bold mb-2">Phone Number</label>
          <input type="number" id="number" name="number" value={formData.number} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="issues" className="block text-gray-700 font-bold mb-2">Issues</label>
          <input type="text" id="issues" name="issues" value={formData.issues} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="subscriptionDays" className="block text-gray-700 font-bold mb-2">Subscription Days</label>
          <input type="number" id="subscriptionDays" name="subscriptionDays" value={formData.subscriptionDays} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
