import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from './API/mindfulHarvestApi';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Box from "@mui/material/Box";

const defaultTheme = createTheme();

const RegistrationForm = () => {
  const [register] = useRegisterUserMutation();
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await register(formData);

    console.log(response)

    if (response && response.error) {
      setErrorMsg(response.error.data.message)
    } else {
       if (response && response.data.newUser.isAdmin === false) {
      navigate('/account');
    }
  }
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Card elevation={3} sx={{ width: '100%' }}>
          <CardContent>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
              Sign up
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleInputChange}
                InputProps={{
                  sx: {
                    '&:focus': {
                      borderColor: '#186F65',
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                InputProps={{
                  sx: {
                    '&:focus': {
                      borderColor: '#186F65',
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#186F65',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#186F65',
                  },
                }}
              >
                Sign Up
              </Button>
              {errorMsg && (
                <Box sx={{
                  border: '1px solid red', padding: '2%', borderRadius: '4px', marginBottom: "3%", marginTop: "2%", width: "60%", justifyContent: "center",
                  alignItems: "center", display: "flex", flexDirection: 'row', marginLeft: "18%", flexWrap: "nowrap",
                }}>
                  <WarningAmberIcon sx={{ color: 'red', marginRight: "3%" }} />
                  <Typography variant='body1'>{errorMsg}</Typography>
                </Box>
              )}
              <Grid container>
                <Grid item xs>
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link style={{ textDecoration: 'none', color: '#186F65' }} to="/login">
                      Login here!
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default RegistrationForm;
