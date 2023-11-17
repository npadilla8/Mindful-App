import { React, useState } from "react";
import { useUpdateProductMutation } from "../API/mindfulHarvestApi";
import { useGetSingleProductQuery } from "../API/mindfulHarvestApi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export default function ProductEdit() {
    const token = useSelector(state => state.token)
    console.log(token)
    //getting id from params to render single product
    const params = useParams();
    const singleProductId = params.productId;

    //states for edit product form
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [available, setAvailable] = useState(null);
    const [returnPolicy, setReturnPolicy] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    //rendering single product and extracting function to update product
    const { data, error, isLoading } = useGetSingleProductQuery(singleProductId);
    const [updateProduct] = useUpdateProductMutation();

    //handling error and loading for useGetSingleProductQuery
    if (isLoading) {
        return <div>Loading...</div>
    };
    if (error) {
        return <div>Unable to Get Single Product.</div>
    };

    //function to update a product using useUpdateProductMutation
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const objFromState = {
                title: title,
                image: image,
                description: description,
                price: (price !== null ? Number(price) : null),
                available: JSON.parse(available),
                returnPolicy: JSON.parse(returnPolicy),
                quantity: (quantity !== null ? Number(quantity) : null),
                categoryId: (categoryId !== null ? Number(categoryId) : null),
            };

            const objTurnedtoArray = Object.entries(objFromState);
            const filteredArray = objTurnedtoArray.filter(([key, value]) => value !== null);
            const filteredProductObj = Object.fromEntries(filteredArray);

            console.log("filteredObj:", filteredProductObj);

            const response = await updateProduct({
                productId: singleProductId, 
                product: filteredProductObj});
            console.log("singleProductId:", singleProductId)
            console.log("backend response:", response)
        } catch (error) {
            console.error(error)
        }
    }

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
            <form method="PUT" onSubmit={handleSubmit}>
                <label>
                    Title: {" "}
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br />
                <label>
                    Image Link: {" "}
                    <input value={image} onChange={(e) => setImage(e.target.value)} />
                </label>
                <br />
                <label>
                    Description: {" "}
                    <input value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <br />
                <label>
                    Price: {" "}
                    <input value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <br />
                <label>
                    Available: {" "}
                    <select value={available} onChange={(e) => setAvailable(e.target.value)}>
                        <option value="">--Select--</option>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </label>
                <br />
                <label>
                    Return Policy: {" "}
                    <select value={returnPolicy} onChange={(e) => setReturnPolicy(e.target.value)}>
                        <option value="">--Select--</option>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </label>
                <br />
                <label>
                    Quantity: {" "}
                    <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </label>
                <br />
                <label>
                    Category: {" "}
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">--Select--</option>
                        <option value={1}>Clothing & Jewelry</option>
                        <option value={2}>Toys</option>
                        <option value={3}>Collectibles & Art</option>
                        <option value={4}>Home & Living</option>
                    </select>
                </label>
                <br />

                <button type="submit">Submit</button>

            </form>


        </>
    )
}