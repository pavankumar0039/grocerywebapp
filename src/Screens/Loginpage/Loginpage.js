import React, { useState } from 'react';
import './Loginpage.css';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setUser,setToken} from '../../Redux/Userslice'
const Loginpage = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [accountType, setAccountType] = useState('User');
  const [formData, setFormData] = useState({
    accountType: 'User',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = { ...formData, accountType };
      const base_url="https://grocerywebapp.onrender.com"

      const url = data.accountType === 'Admin'
        ? `${base_url}/api/adminlogin`
        : `${base_url}/api/userlogin`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          body: JSON.stringify(data),
        });
        const json = await response.json();
       
        alert(json.message);
        if (json.data) {
          let {_id,email,username,profilepic,accounttype}=json.data.dataofuser;
          let data1={_id,email,username,profilepic,accounttype}
            dispatch(setUser(data1))
            localStorage.setItem('email',data1.email);
            dispatch(setToken(json.data.token))
          navigate('/')
        }

      } catch (error) {
        alert("Failed to login");
        console.log('Error:', error);
      }

      setFormData({ accountType: 'User', email: '', password: '' });
      setErrors({});
    }
  };

  return (
    <div className="login-form">
      <h2>{accountType === 'User' ? 'User' : 'Admin'} Login</h2>
      <div className="form-group">
        <label htmlFor="accountType">Account Type</label>
        <select id="accountType" value={accountType} onChange={handleAccountTypeChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="signup-link">
        Not a member? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Loginpage;
