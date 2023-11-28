import { React } from "react";
import Users from "./Users";
import ProductForm from "./ProductForm";
import AllProducts from "./AllProducts";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import '../CSS/adminpage.css';

const AdminAccountPage = () => {
  const adminBoolean = useSelector(state => state.adminBoolean);
  console.log("admin boolean", adminBoolean);

  if (adminBoolean === false) {
    return (
      <p className="permissionMessage"> Need Special Permissions to Access Page. </p>
    );
  }

  return (
    <div className="AdminAccountPage">
      {/* Users Component */}
      <div className="UsersComponent">
        <Users />
      </div>

      {/* AllProducts Component */}
      <div className="AllProductsComponent">
        <AllProducts />
      </div>
    </div>
  );
}

export default AdminAccountPage;
