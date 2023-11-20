import { React } from "react";
import ProductForm from "./ProductForm";
import {useSelector} from "react-redux"

export default function CreateProduct() {
    const adminBoolean = useSelector(state => state.adminBoolean)
    console.log("admin boolean", adminBoolean)

    if(adminBoolean === false) {
        return (
            <p> Need Special Permissions to Access Page. </p>
        )
    };

    return (
        <>
            <h2>Add a New Product for Sale</h2>
            <ProductForm />
        </>
    )
}

