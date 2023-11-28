import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from './API/tokenSlice';
import { setAdminBoolean } from './API/adminBoolean';
import { useDispatch } from 'react-redux';
import './CSS/navbar.css'; 

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
        navigate('/');
    }

    const handleMindfulAppClick = () => {
        navigate('/');
    };

    return (
        <div className="nav-container">
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

                {/* "Mindful App" with click handler */}
                <div className="typography" onClick={handleMindfulAppClick}>
                    Mindful Harvest
                </div>

                <div className="right-section">
                    {(!token) ? (
                        <Link className="register-link" to="/register">
                            Register
                        </Link>
                    ) : (
                        <div className="logout-link" onClick={() => handleSignOut()}>
                            Logout
                        </div>
                    )}

                    {adminBoolean ? (
                        <Link to="/admin" className="account-link">
                            Admin Account
                        </Link>
                    ) : (
                        <Link to="/account" className="account-link">My Account</Link>
                    )}

                    {adminBoolean ? (
                        <Link to="/adminCreate" className="add-product-link">
                            Add a Product
                        </Link>
                    ) : (
                        <Link to="/cart" className="cart-link">
                            Cart
                        </Link>
                    )}
                    
                </div>
            </div>
        </div>
    );
};

export default NavBar;
