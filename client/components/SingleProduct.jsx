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
import { Box, Grid, Card, CardContent, Button, Typography } from '@mui/material';

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
    console.log("cart: ", cart);
    console.log("cart[0]: ", cart[0] && cart[0].quantity);
    console.log("cart.quantity: ", cart.quantity);
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
        <Box sx={{ margin: 5 }}>
            <Grid container justifyContent="center">
                <Grid item >
                    <Card sx={{ maxWidth: 1000 }} >
        <div className='single-product'>
            <div key={data.id}>
                <CardContent align="center">
                <div className="single=product-details">
                    <h2 className="product-title">{data.title}</h2>
                    <p className="product-description">{data.description}</p>
                </div>

                <div className="image-container">
                    <img className="single-image" src={data.image} alt={data.title} />
                </div>

                <div className="product-price">
                    <Typography variant="body1">$ {data.price}</Typography>
                </div>
                     </CardContent>
                        <CardContent align="center">
                <Stack direction="row" spacing={1}>
                    <IconButton aria-label="remove-button" color="secondary" align="center" onClick={setDecrease}>
                        <RemoveCircleTwoToneIcon />
                    </IconButton>
                    <p>{amount}</p>
                    <IconButton aria-label="add-button"  color="secondary" align="center" onClick={setIncrease}>
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
            </div>
        
        </div>
            
        </Card>
        </Grid>
        </Grid>
        </Box>
       
    );
};

export default SingleProduct;
