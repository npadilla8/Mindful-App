import React from "react";
import { useGetSingleProductQuery } from "../API/mindfulHarvestApi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Typography, CircularProgress, Paper, Card, CardContent } from "@mui/material";
import ProductForm from "./ProductForm";

export default function EditProduct() {
    const adminBoolean = useSelector((state) => state.adminBoolean);
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
        <div style={{ display: "flex" }}>
            <Card elevation={3} style={{ width: "30%", padding: "20px", 
            marginBottom: "20px", marginRight: "20px", marginLeft: '2%',
            marginTop: '2%' }}>
                <CardContent>
                    {data ? (
                        <div>
                            <div>
                                <Typography variant="h5">Update Product Details</Typography>
                                <br/>
                                <Typography variant="body1"><b>Title: {data.title}</b></Typography>
                                <Typography variant="body1"><b>Description: </b> {data.description}</Typography>
                                <br/>
                                <img style={{ width: "100%" }} src={data.image} alt={data.title} />
                                <br/>
                                <br/>
                            </div>
                            <div>
                                <Typography variant="body1"><b>Price:</b> ${data.price}</Typography>
                                <Typography variant="body1">
                                    <b>Available:</b> {data.available ? "Available" : "Not Available"}
                                </Typography>
                                <Typography variant="body1">
                                   <b> Return Policy:</b> {data.returnPolicy ? "Returnable" : "Non-Returnable"}
                                </Typography>
                                <Typography variant="body1"><b>Quantity:</b> {data.quantity}</Typography>
                                <Typography variant="body1"><b>Category ID:</b> {data.categoryId}</Typography>
                            </div>
                        </div>
                    ) : (
                        <Typography variant="body1">Unable to View Product</Typography>
                    )}
                </CardContent>
            </Card>

            <Card elevation={3} style={{ width: "70%", padding: "20px", marginBottom: "20px", marginTop: '2%', marginRight: '2%' }}>
                <CardContent>
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
                </CardContent>
            </Card>
        </div>
    );
}
