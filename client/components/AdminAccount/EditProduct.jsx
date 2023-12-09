import React from "react";
import { useGetSingleProductQuery } from "../API/mindfulHarvestApi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Typography, CircularProgress, Paper } from "@mui/material";
import ProductForm from "./ProductForm";

export default function EditProduct() {
    const adminBoolean = useSelector((state) => state.adminBoolean);
    console.log("admin boolean", adminBoolean);

    if (adminBoolean === false) {
        return (
            <Typography variant="body1">
                Need Special Permissions to Access Page.
            </Typography>
        );
    }

    // Getting id from params to render single product
    const { productId } = useParams();

    // Rendering single product
    const { data, error, isLoading } = useGetSingleProductQuery(productId);

    // Handling error and loading for useGetSingleProductQuery
    if (isLoading) {
        return <CircularProgress />;
    }
    if (error) {
        return <Typography variant="body1">Unable to Get Single Product.</Typography>;
    }

    return (
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
            <Typography variant="h5">Edit Product for Sale</Typography>
            {data ? (
                <div>
                    <div>
                        <Typography variant="body1">Title: {data.title}</Typography>
                        <Typography variant="body1">Description: {data.description}</Typography>
                        <img style={{ width: "40%" }} src={data.image} alt={data.title} />
                    </div>
                    <div>
                        <Typography variant="body1">Price: {data.price}</Typography>
                        <Typography variant="body1">
                            Available: {data.available ? "Available" : "Not Available"}
                        </Typography>
                        <Typography variant="body1">
                            Return Policy: {data.returnPolicy ? "Returnable" : "Non-Returnable"}
                        </Typography>
                        <Typography variant="body1">Quantity: {data.quantity}</Typography>
                        <Typography variant="body1">Category Id: {data.categoryId}</Typography>
                    </div>
                </div>
            ) : (
                <Typography variant="body1">Unable to View Product</Typography>
            )}

            <Typography variant="h5">Update Product Details</Typography>
            <Typography variant="h6">Instructions: Edit one or more fields as needed.</Typography>

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
        </Paper>
    );
}
