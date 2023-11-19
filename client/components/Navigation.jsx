import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const token = useSelector((state) => state.token);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleMindfullAppClick = () => {
        navigate('/');
    };

    return (
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
                    {token ? (
                        // If user is signed in, show account information
                        <Link to="/account" className="account-icon">
                            Account
                        </Link>
                    ) : (
                        // If user is a guest, show "Sign In"
                        <div className="sign-in-icon" onClick={handleRegisterClick}>
                            Register
                        </div>
                    )}
                    {/* "Cart" */}
                    <Link to="/cart" className="cart-icon">
                        Cart
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
