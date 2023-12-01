import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from './API/mindfulHarvestApi';
import { useDispatch } from 'react-redux';
import { setAdminBoolean } from './API/adminBoolean';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginUserMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await login({
      email: email,
      password: password,
    });

    console.log(response);

    setEmail('');
    setPassword('');

    if (response.data.user.isAdmin === false) {
      navigate('/account');
    }
    if (response.data.user.isAdmin === true) {
      dispatch(setAdminBoolean({adminBoolean: true}));
      navigate('/admin/users');
    }
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Card elevation={3} sx={{ width: '100%', textAlign: 'center', padding: '20px' }}>
          <CardContent>
            <Avatar sx={{ m: 'auto', mb: 1, bgcolor: '#89B9AD' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
              Sign in
            </Typography>
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  sx: {
                    '&:focus': {
                      borderColor: '#FFC5C5',
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#89B9AD',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#C7DCA7',
                  },
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Typography variant="body2">
                    Forgot password?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" onClick={handleSignUpClick} style={{ cursor: 'pointer' }}>
                    {"Don't have an account? "}
                    <span style={{ color: '#89B9AD' }}>Sign Up</span>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
