import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

import AccountPage from './components/AccountPage';

import LoginPage from './components/LoginPage'
import Register from './components/Register'


const App = () => {

    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/account" element={<AccountPage />} />

        <Route path="/register" element={<Register />} />

      </Routes>
    );
  }
  export default App;
