import {React} from "react";
import Users from "./Users";
import ProductForm from "./ProductForm";
import AllProducts from "./AllProducts";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const AdminAccountPage = () => {
    const token = useSelector(state => state.token)

    if(!token) {
        return (
            <p> Need Special Permissions to Access Page. </p>
        )
    }



    return (
        <>

        <Users/>
        <Link to="/adminCreate">Add a Product</Link>
        <AllProducts/>

        </>
    );
}

export default AdminAccountPage;
