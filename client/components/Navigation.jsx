import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from './API/tokenSlice';
import { setAdminBoolean } from './API/adminBoolean';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
const NavBar = () => {
    const token = useSelector((state) => state.token);
    const adminBoolean = useSelector((state) => state.adminBoolean);

    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    function handleSignOut() {
        dispatch(setToken({ token: null }));
        dispatch(setAdminBoolean({ adminBoolean: false }));
        navigate("/");
    }

    const handleMindfullAppClick = () => {
        navigate('/');
    };

    return (
        <Box sx={{ felxGrow: 1}}>
            <AppBar sx={{bgcolor:"#F6C28B"}} position="static">
        <div className="navigations">
            <div className="app-bar">
                <div className="dropdown">
                    <button className="dropbtn" onClick={toggleDropdown}>
                        Categories
                    </button>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <p>Category 1</p>
                            <p>Category 2</p>
                            <p>Category 3</p>
                        </div>
                    )}
                </div>

                {/* "Mindfull App" with click handler */}
                <div className="typography" onClick={handleMindfullAppClick}>
                    Mindful Harvest
                </div>

                <div className="right-section">
                    {(!token) ? (
                        <Link className="register" to="/register">
                            Register
                        </Link>
                    ) : (
                        <div onClick={() => handleSignOut()}>
                            Logout
                        </div>
                    )}

                    {adminBoolean ? (
                        <Link to="/admin" className="account-icon">
                            Admin Account
                        </Link>
                    ) : (
                        <Link to="/account">MyAccount</Link>
                    )}

                    {adminBoolean ? (
                        <Link to="/adminCreate">
                            Add a Product
                        </Link>
                    ) : (
                        <Link to="/cart" className="cart-icon">
                            Cart
                        </Link>
                    )}
                    
                </div>
            </div>
        </div>
        </AppBar>
        </Box>
    );
};

export default NavBar;
