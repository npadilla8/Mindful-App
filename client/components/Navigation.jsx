import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const token = useSelector((state) => state.token);

    // Entire dropdown
    const [showDropdown, setShowDropdown] = useState(false);

    // Toggle the visibility of the entire dropdown
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="navigations">
            <div className="app-bar">
                <div className="typography">Mindfull App</div>
                <div className="center-section">
                    {/* Categories Button with Dropdown */}
                    <div className="dropdown">
                        <button className="dropbtn" onClick={toggleDropdown}>
                            Categories
                        </button>
                        {showDropdown && (
                            <div className="dropdown-content">
                                {/*content dropdown */}
                                <p>Category 1</p>
                                <p>Category 2</p>
                                <p>Category 3</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="right-section">
                    {/* Sign In Icon */}
                    <div className="sign-in-icon">Sign In</div>
                    {/* Shopping Cart */}
                    <Link to={`/cart`} className="nav-link">
                        <div className="cart-icon">Cart</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
