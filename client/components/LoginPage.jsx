import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from './API/mindfulHarvestApi';
import { useDispatch } from 'react-redux';
import { setAdminBoolean } from './API/adminBoolean';
import './CSS/loginpage.css'; 

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
      dispatch(setAdminBoolean({ adminBoolean: true }));
      navigate('/admin');
    }
  };

  return (
    <div className="login-container">
      <h3>Login</h3>
      <form method="POST" onSubmit={handleLogin} className="login-form">
        <label>
          Email: <input className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password: <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button className="login-button">Submit</button>
      </form>
    </div>
  );
}

export default Login;
