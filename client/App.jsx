import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AdminAccountPage from './components/AdminAccount/AdminAccountPage';
import AccountPage from './components/AccountPage';
import Register from './components/Register';
import Cart from './components/Cart/Cart';
import NavBar from './components/Navigation';
import SingleProduct from './components/SingleProduct';
import EditProduct from './components/AdminAccount/EditProduct';
import CreateProduct from './components/AdminAccount/CreateProduct';
import ConfirmationPage from './components/Cart/ConfirmationPage'

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
        <Route path="/adminEdit/:productId" element={<EditProduct/>} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/adminCreate" element={<CreateProduct />}/>
        <Route path="/confirmation" element={<ConfirmationPage/>}/>
      </Routes>
      </div>
    );
  }
  export default App;
