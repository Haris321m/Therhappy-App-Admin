import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";// Assuming you are using react-router-dom for navigation

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigation=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, user } = response.data;

      // Save token and user in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Check user role
      if (user.role === 'admin') {
       navigation("/main");
      } else {
        setError('Only admin users can log in');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="my-40 m-auto w-56">
      <form onSubmit={handleSubmit}>
        <div className="grid my-5">
          <label className="text-2xl">Email</label>
          <input
            type="text"
            placeholder="Enter email"
            className="p-3 bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid">
          <label className="text-2xl">Password</label>
          <input
            type="password"
            className="p-3 bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="my-5 text-2xl px-5 py-3 bg-green-400 w-full text-white">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;