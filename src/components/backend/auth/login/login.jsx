import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://ecommerce-backend-mdiu.onrender.com/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const token = response.data.data.token;
      const role = response.data.data.role;
      const userId = response.data.data.userId;

      Cookies.set('token', token, { expires: 1 });
      Cookies.set('role', role, { expires: 1 });
      Cookies.set('userId', userId, { expires: 1 });


      if (response.status === 200 && role == "admin") {
        navigate('/backend/product');
        setTimeout(() => {
          toast.success('Login successful!', { autoClose: 5000 });
        }, 500);
      } else if(role == "user"){
        // alert("Only for Admin Login");
        navigate('/login');
        setTimeout(() => {
          toast.error('Only for Admin Login!', { autoClose: 5000 });
        }, 500);
      }else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='logins'>
      <div className="login-container">
        <h2 className='login-title'>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              autocomplete="username"
              required
            />
          </div>
          <div className="form-group password-field">
            <label htmlFor="password">Password:</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autocomplete="current-password"
              required
            />
            <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <ToastContainer autoClose={10000} />
    </div>
  );
};

export default LoginPage;
