import React from "react";
import { useGetSingleProductQuery } from "../API/mindfulHarvestApi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI;
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

export default function EditProduct() {
    const adminBoolean = useSelector(state => state.adminBoolean);
    const { productId } = useParams();
    const { data, error, isLoading } = useGetSingleProductQuery(productId);

    if (adminBoolean === false) {
        return (
            <p> Need Special Permissions to Access Page. </p>
        )
    };

    //handling error and loading for useGetSingleProductQuery
    if (isLoading) {
        return <div>Loading...</div>
    };

    if (error) {
        return <div>Unable to Get Single Product.</div>
    };

    return (
        <>
            <Typography variant="h5" gutterBottom style={{ textAlign: 'center', margin: '2%' }}>Update Product Details</Typography>
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto', alignContent: 'left', marginBottom: '2%' }}>
                {data ? (
                    <Box sx={{ flexGrow: 1 }} style={{ marginBottom: '2%' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <img style={{ width: '80%' }} src={data.image} alt={data.title} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">Title: {data.title}</Typography>
                                <Typography sx={{ fontWeight: '500' }} variant="body1"><b>Description:</b> {data.description}</Typography>
                                <br />
                                <Typography sx={{ fontWeight: '500' }} variant="body1"><b>Price:</b> $ {data.price}</Typography>
                                <Typography sx={{ fontWeight: '500' }} variant="body1"><b>Available:</b> {data.available ? "Available" : "Not Available"}</Typography>
                                <Typography sx={{ fontWeight: '500' }} variant="body1"><b>Return Policy:</b> {data.returnPolicy ? "Returnable" : "Non-Returnable"}</Typography>
                                <Typography sx={{ fontWeight: '500' }} variant="body1"><b>Quantity:</b> {data.quantity}</Typography>
                                <Typography sx={{ fontWeight: '500' }} variant="body1"><b>Category Id:</b> {data.categoryId}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    <Typography variant="body1">Unable to View Product</Typography>
                )}
            </Paper>

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
