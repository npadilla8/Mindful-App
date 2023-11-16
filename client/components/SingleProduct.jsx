import React from 'react';
import { useAddCartItemtoCartMutation, useGetSingleProductQuery } from './API/mindfulHarvestApi';
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
    const {data, error, isLoading} = useGetSingleProductQuery(productId);
    const navigate = useNavigate();
    const [addToCart] = useAddCartItemtoCartMutation();
    const token = useSelector(state => state.token);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const setDecrease = () => {
        setAmount(amount - 1);
    };
    const setIncrease = () => {
        setAmount(amount + 1);
    };

    if(isLoading) {
        return <div>Loading ...</div>
    };

    if(error) {
        return <div>Unable to Get Product</div>
    };

    if(!data) {
        return <p>Unable to view product</p>
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();

        try {
            if(token) {
                await addToCart({
                    productId: Number(productId),
                    quantity: amount
                });
            } else {
                await dispatch(setCart({
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
            <div key={data.id}>

                <div className="single=product-details">
                        <h2 className="product-title">{data.title}</h2>
                        <p className="product-description">{data.description}</p>
                </div>

                <div className="image-container">
                        <img className="single-image" src={data.image} alt={data.title} />
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
