import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AdminAccountPage from './components/AdminAccount/AdminAccountPage';
import AccountPage from './components/AccountPage';
import Register from './components/Register';
import Cart from './components/Cart';
import NavBar from './components/Navigation';

const App = () => {

    return (
      <div> 
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminAccountPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </div>
    );
  }
  export default App;
