import React, { useState } from 'react';
import './Signuppage.css';
import uploadFiles from '.././../Helpers/Convertingfilephototolink'
import { useNavigate } from 'react-router-dom';

function Signuppage() {
    const [accountType, setAccountType] = useState('User');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone: '',
        location: '',
        profilepic: ''
    });
    const [errors, setErrors] = useState({});
   const navgate=useNavigate();




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const uploadphoto = await uploadFiles(file);

                if (uploadphoto && uploadphoto.url) {

                    setFormData((prevData) => ({
                        ...prevData,
                        profilepic: uploadphoto?.url
                    }));

                } else {
                    console.error("Upload returned no URL.");
                }
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    const handleAccountTypeChange = (e) => {
        console.log(e.target.value);
        setAccountType(e.target.value);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = "Username is required.";
        }

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

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (!formData.address) {
            newErrors.address = "Address is required.";
        }

        if (!formData.phone) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits (e.g., 3125551234 for Chicago).";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const location = `${latitude}, ${longitude}`;
                        resolve(location);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        reject('Unable to retrieve location');
                    }
                );
            } else {
                reject('Geolocation is not supported by this browser.');
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const location = await getUserLocation();
                setFormData((prevData) => ({
                    ...prevData,
                    location,
                }));

                let data={...formData,location:location,accounttype:accountType};
                if (accountType === 'Admin') {
                    try {
                        const response = await fetch('http://localhost:4000/api/admincreation', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                              credentials: 'include',
                            body: JSON.stringify(data)
                        })
                        const json = await response.json();
                        console.log(json.data);
                        alert(json.message);
                        navgate('/login');


                    } catch (error) {
                        alert("Failed to insert");
                        console.error('Error:', error);

                    }

                }
                else {
                    try {
                        const response = await fetch('http://localhost:4000/api/usercreation', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include',
                            body: JSON.stringify(data)
                        })
                        const json = await response.json();
                        console.log(json.data);
                        alert(json.message);
                        navgate('/login');
                    } catch (error) {
                        alert("Failed to insert");
                        console.error('Error:', error);

                    }

                }

                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    address: '',
                    phone: '',
                    location: '',
                    profilepic: ''
                });
                setErrors({});
            } catch (error) {
                console.log(error);
                alert(error.message);
            }
        }
    };

    return (
        <div className='signup'>
            <div className="signup-form">
                <h2>{accountType === 'User' ? 'User' : 'Admin'} Sign Up</h2>

                <div className="form-group">
                    <label htmlFor="accountType">Account Type</label>
                    <select
                        id="accountType"
                        value={accountType}
                        onChange={handleAccountTypeChange}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>

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

                    <div className=''></div>
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

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.address && <p className="error">{errors.address}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="312-555-1234" // Chicago area code example
                            required
                        />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>

                    {/* <div className="form-group">
                    <label htmlFor="referral">Referral Code (Optional)</label>
                    <input
                        type="text"
                        id="referral"
                        name="referral"
                        value={formData.referral}
                        onChange={handleInputChange}
                    />
                </div> */}

                    <div className="form-group">
                        <label htmlFor="profilepic">Profile Picture</label>
                        <input
                            type="file"
                            id="profilepic"
                            name="profilepic"
                            className="bg-slate-100 px-2 py-1 focus:outline-primary"

                            onChange={handleFileInputChange}
                        />
                    </div>

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signuppage;
