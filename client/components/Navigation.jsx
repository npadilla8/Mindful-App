import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from './API/tokenSlice';
import { setAdminBoolean } from './API/adminBoolean';
import { setCategoryId } from './API/categoryIdSlice';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { Listbox, MenuItem, MenuButton } from './CSS/categoriesMenu';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { pink } from '@mui/material/colors';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '20ch',
    },
}));

const NavBar = () => {
    const token = useSelector((state) => state.token);
    const adminBoolean = useSelector((state) => state.adminBoolean);
    const categoryId = useSelector((state) => state.categoryId);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(setToken({ token: null }));
        dispatch(setAdminBoolean({ adminBoolean: false }));
        dispatch(setCategoryId({ categoryId: null }));
        navigate('/');
    };

    const handleMindfulAppClick = () => {
        dispatch(setCategoryId({ categoryId: null }));
        navigate('/');
    };

    const handleAccountClick = () => {
        if (token) {
            navigate('/account');
        } else {
            navigate('/login');
        }
    };

    // functions to set categoryId in redux based on dropdown selected
    // drop down will display items only within that category
    const handleClothingJewelryClick = () => {
        dispatch(setCategoryId({ categoryId: Number(1) }));
        navigate('/');
    };
    const handleToyClick = () => {
        dispatch(setCategoryId({ categoryId: Number(2) }));
        navigate('/');
    };
    const handleCollectibleArtClick = () => {
        dispatch(setCategoryId({ categoryId: Number(3) }));
        navigate('/');
    };
    const handleHomeLivingClick = () => {
        dispatch(setCategoryId({ categoryId: Number(4) }));
        navigate('/');
    };
    const handleAllCategoriesClick = () => {
        dispatch(setCategoryId({ categoryId: null }));
        navigate('/');
    };

    console.log('categoryId in redux', categoryId);

    return (
        <div className="nav-container">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ bgcolor: '#FF9494' }} position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1 }}
                            onClick={handleMindfulAppClick}
                        >
                            Mindful Harvest
                        </Typography>
                        <div className="categories">
                            <Dropdown>
                                <MenuButton>Categories</MenuButton>
                                <Menu slots={{ listbox: Listbox }}>
                                    <MenuItem onClick={handleAllCategoriesClick}>All</MenuItem>
                                    <MenuItem onClick={handleClothingJewelryClick}>Clothing & Jewelry</MenuItem>
                                    <MenuItem onClick={handleToyClick}>Toys</MenuItem>
                                    <MenuItem onClick={handleCollectibleArtClick}>Collectibles & Art</MenuItem>
                                    <MenuItem onClick={handleHomeLivingClick}>Home & Living</MenuItem>
                                </Menu>
                            </Dropdown>
                        </div>

                        <div className="right-section">
                            {/* Search Bar */}
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <SearchInput placeholder="Search" />
                            </Search>
                            {!token ? (
                                <div className="register-link" onClick={() => navigate('/register')}></div>
                            ) : (
                                <div className="logout-link" onClick={handleSignOut}>
                                    <LogoutIcon sx={{ color: 'white', marginLeft: 2 }} />
                                </div>
                            )}
                            {adminBoolean ? (
                                <div className="account-link">
                                    <Dropdown>
                                        <MenuButton style={{ backgroundColor: '#FF9494', border: 'none' }}>
                                            <AdminPanelSettingsIcon style={{ backgroundColor: '#FF9494' }} sx={{ color: 'white', marginLeft: 2 }} />
                                        </MenuButton>
                                        <Menu slots={{ listbox: Listbox }}>
                                            <MenuItem onClick={() => navigate('/admin/users')}>List of Users</MenuItem>
                                            <MenuItem onClick={() => navigate('/admin/allproducts')}>Edit/Delete Products</MenuItem>
                                            <MenuItem onClick={() => navigate('/adminCreate')}>Add New Product</MenuItem>
                                        </Menu>
                                    </Dropdown>
                                </div>
                            ) : (
                                <div className="account-link" onClick={handleAccountClick}>
                                    <AccountCircleIcon sx={{ color: 'white', marginLeft: 2 }} />
                                </div>
                            )}
                            <IconButton color="inherit" component={Link} to="/cart" sx={{ textDecoration: 'none' }}>
                                <ShoppingCartIcon sx={{ color: 'white', marginLeft: 2 }} />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default NavBar;
