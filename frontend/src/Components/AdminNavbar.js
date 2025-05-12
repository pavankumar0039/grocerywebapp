import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaListAlt, FaSignOutAlt } from 'react-icons/fa';
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { setToken, setUser } from '../Redux/Userslice';

const AdminNavbar = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const addinggrocery = () => {
    props.addgrocery();
  };

  const addingproduct = () => {
    props.addproduct();
  };
  const handleonchangesearch = (e) => {
    props.setsearchvalue(e.target.value)

  }
  const opencart = () => {
    navigate('/cart')
  }
  const logout = async () => {
    try {
      const base_url="http://localhost:4000"
      const response = await fetch(`${base_url}/api/logout`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'


      })
      let result = await response.json();
      alert(result.message)
      dispatch(setUser({}))
      dispatch(setToken(""))
      navigate('/');

    } catch (error) {
      console.log(error);

    }
  }

  const styles = {
    navbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#333',
      padding: '0.8rem 1.5rem',
      color: '#fff',
      position: 'relative',
    },
    heading: {
      fontSize: '1.5rem',
      margin: 0,
    },
    searchBar: {
      flex: 1,
      margin: '0 1.2rem',

    },
    searchInput: {
      width: '20rem',
      padding: '0.4rem 0.6rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '0.9rem',
    },
    menuIcon: {
      fontSize: '1.5rem',
      cursor: 'pointer',
      display: 'block',
    },
    buttons: {
      display: 'flex',
      alignItems: 'center',
    },
    addButton: {
      padding: '0.4rem 0.8rem',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      marginLeft: '8px',
      textDecoration: 'none',
    },
    profile: {
      position: 'relative',
      cursor: 'pointer',
      marginLeft: '1rem',
    },
    profileIcon: {
      width: '35px',
      height: '35px',
      backgroundColor: '#555',
      borderRadius: '50%',
    },
    dropdown: {
      position: 'absolute',
      top: '45px',
      right: '0',
      backgroundColor: '#fff',
      minWidth: '220px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      borderRadius: '6px',
      overflow: 'hidden',
      zIndex: 1,
      padding: '0.5rem 0',
      display: dropdownVisible ? 'block' : 'none',
    },
    dropdownItem: {
      padding: '0.8rem 1.2rem',
      color: '#333',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      fontSize: '1rem',
      fontWeight: '500',
      borderRadius: '6px',
      margin: '0.2rem 0.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
    },
    dropdownItemHover: {
      backgroundColor: '#f0f0f0',
      color: '#007bff',
      transform: 'scale(1.02)',
    },
    icon: {
      marginRight: '0.6rem',
      fontSize: '1.2rem',
      color: '#007bff',
    },
    sidebar: {
      display: 'none'
    },
    sidebar1: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '250px',
      backgroundColor: '#333',
      color: '#fff',
      zIndex: 2,
      padding: '1rem',
      boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
      transition: 'left 0.3s ease',
    },
    closeSidebar: {
      fontSize: '1.5rem',
      cursor: 'pointer',
      display: 'block',
      marginBottom: '1rem',
    },
    sidebarItem: {
      padding: '0.8rem',
      fontSize: '1.1rem',
      color: '#fff',
      textDecoration: 'none',
      display: 'block',
      backgroundColor: '#444',
      borderRadius: '6px',
      margin: '0.5rem 0',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
    },
    sidebarItemHover: {
      backgroundColor: '#555',
      transform: 'scale(1.02)',
    },
    navbar2: {
      backgroundColor: "rgb(144, 183, 199)",
      width: "100%",
      height: "3rem",
      display: "flex",
      justifyContent: "center",
      alignItems: 'center'

    },
    navbar1: {
      width: "100%",
      position: 'fixed',
      zIndex: '2'
    },
    addingextra: {
      width: "100%",
      height: "6rem"
    },
    searchbar: {
      width: "25rem",
      border: 'none',
      height: '2rem',
      borderRadius: '7px'
    }
  };

  return (
    <>
      <div style={styles.navbar1}>
        <nav style={styles.navbar}>
          <span style={styles.menuIcon} onClick={toggleSidebar}>☰</span>
          <h1 style={styles.heading}>Grocery Assistant</h1>
          {/* <div style={styles.searchBar}>
          <input type="text" placeholder="Search..." style={styles.searchInput} />
        </div> */}
          <div style={styles.buttons}>
            {!(user.accounttype === "Admin" || user.accounttype === 'User') && <Link to='/login' style={styles.addButton}>Login</Link>}
            {props.isgrocerypage && user.accounttype === 'Admin' && <button style={styles.addButton} onClick={addinggrocery}>Add Grocery</button>}
            {props.isproductpage && user.accounttype === 'Admin' && <button style={styles.addButton} onClick={addingproduct}>Add Product</button>}
            {user.accounttype === 'User' && <FaCartFlatbedSuitcase size={30} style={{ cursor: 'pointer' }} onClick={opencart} />}
            <div style={styles.profile} onClick={toggleDropdown}>
              <div style={styles.profileIcon}>
                <img src={user.profile_pic} alt="" style={styles.profileIcon}></img>
              </div>
              {dropdownVisible && (
                <div style={styles.dropdown}>
                  <Link to={"editprofile"} style={styles.dropdownItem}>
                    <FaUserEdit style={styles.icon} /> Edit Profile
                  </Link>
                  {user.accounttype === "User" && <Link to={"/myorders"} style={styles.dropdownItem}>
                    <FaListAlt style={styles.icon} /> My Orders
                  </Link>}
                 
                  <Link to={"logout"} style={styles.dropdownItem} onClick={logout}>
                    <FaSignOutAlt style={styles.icon}  /> Logout
                  </Link>
                </div>
              )}
            </div>
          </div>

        </nav>
        <div style={styles.navbar2}>
          <input value={props.searchvalue} style={styles.searchbar} onChange={handleonchangesearch} placeholder='Search here..'></input>
        </div>
      </div>
      <div style={styles.addingextra}></div>

      {/* Sidebar for small screens */}
      <div style={sidebarVisible === false ? styles.sidebar : styles.sidebar1}>
        <span style={styles.closeSidebar} onClick={toggleSidebar}>×</span>
        <Link to='/login' style={styles.sidebarItem}>Login</Link>
        {props.isgrocerypage && user.accounttype === 'Admin' && <button style={styles.sidebarItem} onClick={addinggrocery}>Add Grocery</button>}
        {props.isproductpage && user.accounttype === 'Admin' && <button style={styles.sidebarItem} onClick={addingproduct}>Add Product</button>}

        {user.accounttype === 'User' && <a href="/myorders" style={styles.sidebarItem}>Orders</a>}
        <a href="/editprofile?1" style={styles.sidebarItem}>Edit Profile</a>
        <a href="#logout" style={styles.sidebarItem} onClick={logout} >Logout</a>
      </div>
    </>
  );
};

export default AdminNavbar;
