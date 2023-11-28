import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from './API/tokenSlice';
import { setAdminBoolean } from './API/adminBoolean';
import {setCategoryId} from './API/categoryIdSlice'
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
import { Listbox, MenuItem, MenuButton } from './CSS/categoriesMenu'
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';

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
    const categoryId = useSelector((state) => state.categoryId )
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

    const handleAccountClick = () => {
        if (token) {
            navigate('/account');
        } else {
            navigate('/login');
        }
    };

    const handleClothingJewClick = () => {
        dispatch(setCategoryId({categoryId: Number(1)}));
        navigate("/");
    }

    console.log(categoryId)


    return (
        <div className="nav-container">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ bgcolor: "#FF9494" }} position="static">
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
                                        <MenuItem onClick={handleClothingJewClick}>
                                            Clothing & Jewelry
                                        </MenuItem>
                                        <MenuItem onClick={()=>console.log("toys")}>
                                            Toys
                                        </MenuItem>
                                        <MenuItem onClick={()=>console.log("art")}>
                                            Collectibles & Art
                                        </MenuItem>
                                        <MenuItem onClick={()=>console.log("home")}>
                                            Home & Living
                                        </MenuItem>
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
                                <div className="register-link" onClick={() => navigate('/register')}>
                                </div>
                            ) : (
                                <div className="logout-link" onClick={handleSignOut}>
                                    <LogoutIcon sx={{ color: 'white', marginLeft: 2 }} />
                                </div>
                            )}
                            {adminBoolean ? (
                                <Link to="/admin" className="account-link">
                                    <AdminPanelSettingsIcon sx={{ color: 'white', marginLeft: 2 }} />
                                </Link>
                            ) : (
                                <div className="account-link" onClick={handleAccountClick}>
                                    <AccountCircleIcon sx={{ color: 'white', marginLeft: 2 }} />
                                </div>
                            )}
                            <Link to="/cart" className="cart-link">
                                <IconButton color="inherit" component={Link} to="/cart">
                                    <ShoppingCartIcon sx={{ color: 'white', marginLeft: 2 }} />
                                </IconButton>
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default NavBar;
