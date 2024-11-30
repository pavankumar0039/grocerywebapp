import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uploadFiles from '../Helpers/Convertingfilephototolink';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const placeholderImage = 'https://via.placeholder.com/100';

  // const [accountType, setAccountType] = useState('User');
  const [formData, setFormData] = useState({
    _id: user._id,
    username: user.name,
   
    phone:"",
    address: user.address,
    location: user.location,
    profilepic: user.profilepic,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadphoto = await uploadFiles(file);

        if (uploadphoto?.url) {
          setFormData({ ...formData, profilepic: uploadphoto.url });
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            profilepic: 'Failed to upload profile picture.',
          }));
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          profilepic: 'Error uploading file.',
        }));
      }
    }
  };

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`${latitude}, ${longitude}`);
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

    try {
      const location = await getUserLocation();
      const data = { ...formData, location };

      const endpoint =
        user.accounttype === 'Admin'
          ? 'http://localhost:4000/api/adminupdate'
          : 'http://localhost:4000/api/userupdate';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate('/');
      } else {
        alert('Error updating profile: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to update profile.');
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: 'auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: { textAlign: 'center', marginBottom: '20px' },
    profilePictureContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    },
    profilePicture: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid #ccc',
    },
    editPictureButton: {
      marginTop: '10px',
      fontSize: '14px',
      color: '#007bff',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    fileInput: { display: 'none' },
    form: { display: 'flex', flexDirection: 'column' },
    inputContainer: { marginBottom: '15px' },
    label: { fontSize: '14px', fontWeight: 'bold', color: '#333' },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    saveButton: {
      padding: '12px',
      fontSize: '16px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Edit Profile</h2>
      </header>

      <div style={styles.profilePictureContainer}>
        <img
          src={formData.profilepic || placeholderImage}
          alt="Profile"
          style={styles.profilePicture}
        />
        <label style={styles.editPictureButton}>
          <input type="file" style={styles.fileInput} onChange={handleFileInputChange} />
          Change Photo
        </label>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        {[
          { label: 'Name', name: 'username', type: 'text' },
          
          { label: 'Phone Number', name: 'phone', type: 'tel' },
        ].map(({ label, name, type }) => (
          <div style={styles.inputContainer} key={name}>
            <label style={styles.label}>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
        ))}
        <div style={styles.inputContainer}>
          <label style={styles.label}>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={{ ...styles.input, height: '60px', resize: 'none' }}
          />
        </div>
        {/* <div style={styles.inputContainer}>
          <label style={styles.label}>Account Type</label>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            style={styles.input}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div> */}

        <button type="submit" style={styles.saveButton}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
