import React from 'react';
import { useAddCartItemtoCartMutation, useGetSingleProductQuery, useUpdateQuantityOfCartItemMutation, useGetUserWithCartQuery } from './API/mindfulHarvestApi';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from './API/cartSlice';

const SingleProduct = () => {
    const [amount, setAmount] = useState(1);
    const { productId } = useParams();
    const navigate = useNavigate();
    const {data: singleProductData, error: singleProductError, isLoading: singleProductIsLoading} = useGetSingleProductQuery(productId);
    const {data: userWithCartData, error: userWithCartError, isLoading: userWithCartIsLoading} = useGetUserWithCartQuery();
    const [addToCart] = useAddCartItemtoCartMutation();
    const [updateCart] = useUpdateQuantityOfCartItemMutation();
    const token = useSelector(state => state.token);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const setDecrease = () => {
        setAmount(amount - 1);
    };
    const setIncrease = () => {
        setAmount(amount + 1);
    };

    if(singleProductIsLoading) {
        return <div>Loading ...</div>
    };

    if(singleProductError) {
        return <div>Unable to Get Product</div>
    };

    if(!singleProductData) {
        return <p>Unable to view product</p>
    };

console.log(userWithCartData);
console.log(userWithCartData.cart.items);

    const handleAddToCart = async (e) => {
        e.preventDefault();

        try {
            if(token) {
                for (let i = 0; i < userWithCartData.cart.items.length; i++) {
                    if(userWithCartData.cart.items[i].productId === Number(productId)) {
                        await updateCart({
                            cartItemId: userWithCartData.cart.items[i].id,
                            quantity: amount + userWithCartData.cart.items[i].quantity
                        });
                        return;
                    }
                }
                await addToCart({
                    productId: Number(productId),
                    quantity: amount
                });
            } else {
                dispatch(setCart({
                    productId: Number(productId),
                    quantity: amount
                }));
            }
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <div className='single-product'>
            <div key={singleProductData.id}>

                <div className="single=product-details">
                    <h2 className="product-title">{singleProductData.title}</h2>
                    <p className="product-description">{singleProductData.description}</p>
                </div>

                <div className="image-container">
                    <img className="single-image" src={singleProductData.image} alt={singleProductData.title} />
                </div>

                <div className="product-price">
                    <p>$ {singleProductData.price}</p>
                </div>

                <Stack direction="row" spacing={1}>
                    <IconButton aria-label="remove-button" onClick={setDecrease}>
                        <RemoveCircleTwoToneIcon />
                    </IconButton>
                    <p>{amount}</p>
                    <IconButton aria-label="add-button" onClick={setIncrease}>
                        <AddCircleTwoToneIcon />
                    </IconButton>
                </Stack>

                <button className='add-to-cart-button' onClick={handleAddToCart}>Add to Cart</button>

            </div>
        </div>
    );
};

export default SingleProduct;
