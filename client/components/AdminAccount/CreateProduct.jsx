import { React } from "react";
import ProductForm from "./ProductForm";
import {useSelector} from "react-redux"

export default function CreateProduct() {
    const token = useSelector(state => state.token)

    if (!token) {
        return (
            <p> Need Special Permissions to Access Page. </p>
        )
    }
    return (
        <>
            <h2>Add a New Product for Sale</h2>
            <ProductForm />
        </>
    )
}

