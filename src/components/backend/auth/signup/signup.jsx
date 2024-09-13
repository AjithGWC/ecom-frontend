import React, { useState } from 'react';
import './SignupPage.css'; 

const SignupPage = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    retypePassword: '',
    countryCode: '',
    phoneNumber: '',
    gender: '',
    image: null,
    address: '',
    district: '',
    state: '',
    country: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className='signup'>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <div className="tabs">
          <input
            type="radio"
            id="personal"
            name="tab"
            checked={activeTab === 'personal'}
            onChange={() => handleTabChange('personal')}
          />
          <label htmlFor="personal" className={`tab ${activeTab === 'personal' ? 'active' : ''}`}>
            Personal Information
          </label>
          <div className="line"></div>
          <input
            type="radio"
            id="additional"
            name="tab"
            checked={activeTab === 'additional'}
            onChange={() => handleTabChange('additional')}
          />
          <label htmlFor="additional" className={`tab ${activeTab === 'additional' ? 'active' : ''}`}>
            Additional Information
          </label>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          {activeTab === 'personal' && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="retypePassword">Retype Password:</label>
                <input
                  type="password"
                  id="retypePassword"
                  name="retypePassword"
                  value={formData.retypePassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {activeTab === 'additional' && (
            <>
              <div className="form-group">
                <label htmlFor="countryCode">Country Code:</label>
                <input
                  type="text"
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">Profile Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="district">District:</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
