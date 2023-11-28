
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
import { Box, Grid, Card, CardContent, Button, Typography } from '@mui/material';

const SingleProduct = () => {
    const [amount, setAmount] = useState(1);
    const { productId } = useParams();
    const navigate = useNavigate();
    const { data: singleProductData, error: singleProductError, isLoading: singleProductIsLoading } = useGetSingleProductQuery(productId);
    const { data: userWithCartData, error: userWithCartError, isLoading: userWithCartIsLoading } = useGetUserWithCartQuery();
    const [addToCart] = useAddCartItemtoCartMutation();
    const [updateCart] = useUpdateQuantityOfCartItemMutation();
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    const setDecrease = () => {
        setAmount(amount - 1);
    };

    const setIncrease = () => {
        setAmount(amount + 1);
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();

        try {
            if (token) {
                const existingCartItem = userWithCartData.cart.items.find(item => item.productId === Number(productId));

                if (existingCartItem) {
                    const newQuantity = amount + existingCartItem.quantity;
                    await updateCart({
                        cartItemId: existingCartItem.id,
                        quantity: newQuantity
                    });
                } else {
                    await addToCart({
                        productId: Number(productId),
                        quantity: amount
                    });
                }
            } else {
                dispatch(setCart({
                    productId: Number(productId),
                    quantity: amount
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (singleProductIsLoading) {
        return <div>Loading ...</div>;
    }

    if (singleProductError) {
        return <div>Unable to Get Product</div>;
    }

    if (!singleProductData) {
        return <p>Unable to view product</p>;
    }

    return (
        <Box sx={{ margin: 5 }}>
            <Grid container justifyContent="center">
                <Grid item>
                    <Card sx={{ maxWidth: 1000 }} >
                        <CardContent align="center">
                            <div className="single-product-details">
                                <h2 className="product-title">{singleProductData.title}</h2>
                                <p className="product-description">{singleProductData.description}</p>

                            </div>
                            <div className="image-container">
                                <img className="single-image" src={singleProductData.image} alt={singleProductData.title} />
                            </div>
                            <div className="product-price">
                                <Typography variant="body1">$ {singleProductData.price}</Typography>
                            </div>
                        </CardContent>
                        <CardContent align="center">
                            <Stack direction="row" spacing={1}>
                                <IconButton aria-label="remove-button" color="secondary" align="center" onClick={setDecrease}>
                                    <RemoveCircleTwoToneIcon />
                                </IconButton>
                                <p>{amount}</p>
                                <IconButton aria-label="add-button" color="secondary" align="center" onClick={setIncrease}>
                                    <AddCircleTwoToneIcon />
                                </IconButton>
                            </Stack>

                            <Button
                                className='add-to-cart-button'
                                variant="contained"
                                color="secondary"
                                onClick={handleAddToCart}>Add to Cart
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SingleProduct;
