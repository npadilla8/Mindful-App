import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from './API/tokenSlice';
import { setAdminBoolean } from './API/adminBoolean';
import { useDispatch } from 'react-redux';
import './CSS/navbar.css';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import { Listbox, MenuItem, MenuButton } from './CSS/categoriesMenu'
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';


const NavBar = () => {
    const token = useSelector((state) => state.token);
    const adminBoolean = useSelector((state) => state.adminBoolean);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(setToken({ token: null }));
        dispatch(setAdminBoolean({ adminBoolean: false }));
        navigate('/');
    };
    const handleMindfulAppClick = () => {
        navigate('/');
    };

    const createHandleMenuClick = (menuItem) => {
        return () => {
            console.log(`Clicked on ${menuItem}`);
        };
    };

    return (
        <div className="nav-container">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ bgcolor: "#F6C28B" }} position="static">
                    <div className="navigations">
                        <div className="app-bar">
                            {/* ... (dropdown) */}
                            <div className="typography" onClick={handleMindfulAppClick}>
                                Mindful Harvest
                            </div>
                            <div className="categories">
                                <Dropdown>
                                    <MenuButton>Categories</MenuButton>
                                    <Menu slots={{ listbox: Listbox }}>
                                        <MenuItem onClick={createHandleMenuClick('Profile')}>
                                            Clothing & Jewelry
                                        </MenuItem>
                                        <MenuItem onClick={createHandleMenuClick('Language settings')}>
                                            Toys
                                        </MenuItem>
                                        <MenuItem onClick={createHandleMenuClick('Log out')}>
                                            Collectibles & Art
                                        </MenuItem>
                                        <MenuItem onClick={createHandleMenuClick('Log out')}>
                                            Home & Living
                                        </MenuItem>
                                    </Menu>
                                </Dropdown>

                            </div>
                            <div className="right-section">
                                {!token ? (
                                    <Link className="register-link" to="/register">
                                        Register
                                    </Link>
                                ) : (
                                    <div className="logout-link" onClick={handleSignOut}>
                                        Logout
                                    </div>
                                )}
                                {adminBoolean ? (
                                    <Link to="/admin" className="account-link">
                                        Admin Account
                                    </Link>
                                ) : (
                                    <Link to="/account" className="account-link">
                                        My Account
                                    </Link>
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
                </AppBar>
            </Box>
        </div>
    );
};
export default NavBar;