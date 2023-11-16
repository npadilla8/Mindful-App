import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const token = useSelector((state) => state.token);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate(); 

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSignInClick = () => {
        navigate('/login');
    };

    return (
        <div className="navigations">
            <div className="app-bar">
                <div className="typography">Mindfull App</div>
                <div className="center-section">
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
                </div>
                <div className="right-section">
                    {/* Update the "Sign In" section */}
                    <div className="sign-in-icon" onClick={handleSignInClick}>
                        Sign In
                    </div>
                    {/* Update the "Cart" link */}
                    <Link to="/cart" className="nav-link">
                        <div className="cart-icon">Cart</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
