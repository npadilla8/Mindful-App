import React from "react";
import { useGetSingleProductQuery } from "../API/mindfulHarvestApi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI

export default function EditProduct() {
    const adminBoolean = useSelector(state => state.adminBoolean)
    console.log("admin boolean", adminBoolean)

    if(adminBoolean === false) {
        return (
            <p> Need Special Permissions to Access Page. </p>
        )
    };
    
    //getting id from params to render single product
    const { productId } = useParams();
    // const singleProductId = params.productId;

    //rendering single product 
    const { data, error, isLoading } = useGetSingleProductQuery(productId);

    //handling error and loading for useGetSingleProductQuery
    if (isLoading) {
        return <div>Loading...</div>
    };
    if (error) {
        return <div>Unable to Get Single Product.</div>
    };

    return (
        <>
            <Typography variant="h5" gutterBottom>Edit Product for Sale</Typography>
            {data ? (
                <div>
                    <div>
                        <Typography variant="subtitle1">Title: {data.title}</Typography>
                        <Typography variant="body1">Description: {data.description}</Typography>
                        <img style={{ width: '20%' }} src={data.image} alt={data.title} />
                    </div>
                    <div>
                        <Typography variant="body1">Price: {data.price}</Typography>
                        <Typography variant="body1">Available: {data.available ? "Available" : "Not Available"}</Typography>
                        <Typography variant="body1">Return Policy: {data.returnPolicy ? "Returnable" : "Non-Returnable"}</Typography>
                        <Typography variant="body1">Quantity: {data.quantity}</Typography>
                        <Typography variant="body1">Category Id: {data.categoryId}</Typography>
                    </div>
                </div>
            ) : (
                <Typography variant="body1">Unable to View Product</Typography>
            )}

            <Typography variant="h5" gutterBottom>Update Product Details</Typography>
            <Typography variant="h7" gutterBottom>Instructions: Edit one or more fields as needed.</Typography>

            <ProductForm
                productId={productId}
                title={data.title}
                image={data.image}
                description={data.description}
                price={data.price}
                available={data.available}
                returnPolicy={data.returnPolicy}
                quantity={data.quantity}
                categoryId={data.categoryId}
            />
        </>
    )
}
