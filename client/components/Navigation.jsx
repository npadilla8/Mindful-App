import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from './API/tokenSlice';
import { setAdminBoolean } from './API/adminBoolean';
import { setCategoryId } from './API/categoryIdSlice';
import { setSearchField } from './API/searchFieldSlice';
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
import { styled } from '@mui/material/styles';
import { Listbox, MenuItem, MenuButton } from './CSS/categoriesMenu';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';




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
  const searchField = useSelector((state) => state.searchField);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(setToken({ token: null }));
    dispatch(setAdminBoolean({ adminBoolean: false }));
    dispatch(setCategoryId({ categoryId: null }));
    navigate('/login');
  };

  const handleMindfulAppClick = () => {
    dispatch(setCategoryId({ categoryId: null }));
    dispatch(setSearchField({ searchField: null }));
    navigate('/');
  };

  const handleAccountClick = () => {
    if (token) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

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
    dispatch(setSearchField({ searchField: null }))
    navigate('/');
  };

  const handleSearchBar = (event) => {
    event.preventDefault();
    dispatch(setCategoryId({ categoryId: null }));
    navigate("/");
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    dispatch(setSearchField({ searchField: searchTerm }));
  }, [searchTerm]);

  return (
    <div className="nav-container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ bgcolor: '#F94892' }} position="static">
          <Toolbar>
            <img src='https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/00274_Design_Free_Lotus_Flower_Logo_Templates-01.png' alt="Mindful Harvest Logo" style={{ height: '30px', marginRight: '10px', cursor: 'pointer' }} onClick={handleMindfulAppClick} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                textTransform: 'uppercase',
                fontWeight: 'semibold',
                fontSize: '14px',
              }}
              onClick={handleMindfulAppClick}
              style={{ cursor: 'pointer' }}
            >
              Mindful <br></br>Harvest
            </Typography>
            <div className="categories">
              <Dropdown>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <MenuButton style={{ color: 'white', fontSize: '17px' }}>
                  Categories
                </MenuButton>
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
              <Search>
                <SearchIconWrapper>
                  <SearchIcon style={{ cursor: 'pointer' }} />
                </SearchIconWrapper>
                <SearchInput placeholder="Search" value={searchTerm} onChange={handleSearchBar} />
              </Search>
              {!token ? (
                <Tooltip title="Sign In" arrow>
                  <div className="register-link" onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}></div>
                </Tooltip>
              ) : (
                <Tooltip title="Log Out" arrow>
                  <div className="logout-link" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
                    <LogoutIcon sx={{ color: 'white', marginLeft: 2 }} />
                  </div>
                </Tooltip>
              )}
              {adminBoolean ? (
                <div className="account-link">
                  <Dropdown>
                    <MenuButton
                      style={{ backgroundColor: '#F94892', border: 'none', cursor: 'pointer' }}
                    >
                      <Tooltip title="Admin Menu" arrow>
                        <AdminPanelSettingsIcon
                          style={{ backgroundColor: '#F94892', cursor: 'pointer' }}
                          sx={{ color: 'white', marginLeft: 2 }}
                        />
                      </Tooltip>
                    </MenuButton>
                    <Menu slots={{ listbox: Listbox }}>
                      <MenuItem onClick={() => navigate('/admin/users')}>List of Users</MenuItem>
                      <MenuItem onClick={() => navigate('/admin/allproducts')}>Edit/Delete Products</MenuItem>
                      <MenuItem onClick={() => navigate('/adminCreate')}>Add New Product</MenuItem>
                    </Menu>
                  </Dropdown>
                </div>
              ) : (
                <Tooltip title={token ? "Account Page" : "Sign In"} arrow>
                  <div className="account-link" onClick={handleAccountClick} style={{ cursor: 'pointer' }}>
                    <AccountCircleIcon sx={{ color: 'white', marginLeft: 2 }} />
                  </div>
                </Tooltip>
              )}
              {!adminBoolean && (
                <Tooltip title="Go to Cart" arrow>
                  <IconButton
                    color="inherit"
                    component={Link}
                    to="/cart"
                    sx={{
                      textDecoration: 'none',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <ShoppingCartIcon sx={{ color: 'white', marginLeft: 2 }} />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default NavBar;
