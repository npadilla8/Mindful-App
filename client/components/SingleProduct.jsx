import React from 'react';
import { useGetSingleProductQuery } from './API/mindfulHarvestApi';
import { useParams, useNavigate } from 'react-router-dom';
import { createNextState } from '@reduxjs/toolkit';

const SingleProduct = () => {
    const {data, error, isLoading} = useGetSingleProductQuery(productId);
    const navigate = useNavigate();
    const { productId } = useParams();

    const handleAddToCart = async (e) => {
        e.preventDefault();

        try {
            // TODO: fill with what happens when add to cart is clicked
        } catch (error) {
            console.error(error);
        };
        navigate('/cart');
    };

    console.log(data);

    return (
        <div className='single-product'>
            <div key={data}></div>
        </div>
    );
};

export default SingleProduct;
