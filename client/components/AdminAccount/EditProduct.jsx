import { React } from "react";
import { useGetSingleProductQuery } from "../API/mindfulHarvestApi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import ProductForm from "./ProductForm";

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
            <h3>Edit Product for Sale</h3>
            {data ? (
                <div>
                    <div>
                        <p>Title: {data.title}</p>
                        <p>Description: {data.description}</p>
                        <img style={{ width: '40%' }} src={data.image} alt={data.title} />
                    </div>
                    <div>
                        <p>Price: {data.price}</p>
                        <p>Available: {data.available ? "Available" : "Not Available"}</p>
                        <p>Return Policy: {data.returnPolicy ? "Returnable" : "Non-Returnable"}</p>
                        <p>Quantity: {data.quantity}</p>
                        <p>Category Id: {data.categoryId}</p>
                    </div>

                </div>
            ) : (
                <p> Unable to View Product </p>
            )}

            <h3>Update Product Details</h3>
            <h5>Instructions: Edit one or more fields as needed. </h5>

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
