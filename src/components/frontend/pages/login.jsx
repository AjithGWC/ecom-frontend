import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-backend-mdiu.onrender.com/login', { email, password });
  
      if (response.data.data.token) {
        document.cookie = `token=${response.data.data.token}; path=/; secure; samesite=strict`;
        if (response.data.data.userId) {
          document.cookie = `userId=${response.data.data.userId}; path=/; secure; samesite=strict`;
        }
        if (response.data.data.role) {
          document.cookie = `role=${response.data.data.role}; path=/; secure; samesite=strict`;
        }
        navigate('/');
        setTimeout(() => {
          toast.success('Login successful!', { autoClose: 5000 });
        }, 500);
      } else {
        toast.error('Invalid login credentials', { autoClose: 5000 });
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed', { autoClose: 5000 }); 
    }
  };
  

  return (
    <div className='bg-login'>
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin}>
          <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
              </label>
              <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              autocomplete="username"
              required
              />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              autocomplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-black border-2 border-black py-2 rounded hover:bg-blue-600 hover:border-transparent hover:text-white"
          >
            Login
          </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up here
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer autoClose={10000} />
    </div>
  );
};

export default Login;
