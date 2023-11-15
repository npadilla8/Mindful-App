import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLoginUserMutation } from './API/mindfulHarvestApi';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [login] = useLoginUserMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await login({
      email: email,
      password: password,
    });

    console.log(response)

    setEmail("");
    setPassword("")
    
    if(response.data.user.isAdmin === false) {
      navigate("/account")
    } 
    if (response.data.user.isAdmin === true) {
      navigate("/admin")
    } 


  };

  return (
    <>
      <h3>Login</h3>
      <form method="POST" onSubmit={handleLogin}>
        <label>
          Email: {" "}
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password: {" "}
          <input value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}

export default Login;
