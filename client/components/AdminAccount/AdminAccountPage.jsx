import {React} from "react";
import Users from "./Users";
import ProductForm from "./ProductForm";
import AllProducts from "./AllProducts";
import { useSelector } from "react-redux";

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
        <ProductForm/>
        <AllProducts/>
        
        
        </>
    );
}

export default AdminAccountPage;
