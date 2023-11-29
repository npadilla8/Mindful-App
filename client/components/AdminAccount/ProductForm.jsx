import { React, useState } from 'react';
import { useAddProductMutation, useUpdateProductMutation } from '../API/mindfulHarvestApi';
import { useNavigate } from 'react-router-dom';

export default function ProductForm(props) {
    const [productId, setProductId] = useState(props.productId ?? '');
    const [title, setTitle] = useState(props.title ?? '');
    const [image, setImage] = useState(props.image ?? '');
    const [description, setDescription] = useState(props.description ?? '');
    const [price, setPrice] = useState(props.price ?? '');
    const [available, setAvailable] = useState(props.available ?? '');
    const [returnPolicy, setReturnPolicy] = useState(props.returnPolicy ?? '');
    const [quantity, setQuantity] = useState(props.quantity ?? '');
    const [categoryId, setCategoryId] = useState(props.categoryId ?? '');

    const [updateProduct] = useUpdateProductMutation();
    const [addProduct] = useAddProductMutation();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const updatedProduct = {
            title: title,
            image: image,
            description: description,
            price: Number(price),
            available: JSON.parse(available),
            returnPolicy: JSON.parse(returnPolicy),
            quantity: Number(quantity),
            categoryId: Number(categoryId)
        };

        if (productId) {
            const updateResponse = await updateProduct({
                productId: productId,
                product: updatedProduct
            });
            console.log("PUT product: ", updateResponse)
        } else {
            const addResponse = await addProduct({
                title: title,
                image: image,
                description: description,
                price: Number(price),
                available: JSON.parse(available),
                returnPolicy: JSON.parse(returnPolicy),
                quantity: Number(quantity),
                categoryId: Number(categoryId),
            });
            console.log("POST Product: ", addResponse);
            navigate("/admin/allproducts");
        }
    }

    return (
        <>
            <form method="POST" onSubmit={handleSubmit}>
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

                <button>Submit</button>

            </form>
        </>
    )
}
