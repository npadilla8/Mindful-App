import React from 'react';
import { useAddCartItemtoCartMutation, useGetSingleProductQuery } from './API/mindfulHarvestApi';
import { useParams, useNavigate } from 'react-router-dom';
import { createNextState } from '@reduxjs/toolkit';

const SingleProduct = () => {
    const { productId } = useParams();
    const {data, error, isLoading} = useGetSingleProductQuery(productId);
    const navigate = useNavigate();
    const [addToCart] = useAddCartItemtoCartMutation();

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
            await addToCart({
                productId, quantity
            });
        } catch (error) {
            console.error(error);
        };
        navigate('/cart');
    };

    console.log(data);

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

                <button className='add-to-cart-button' onClick={handleAddToCart}>Add to Cart</button>

            </div>
        </div>
    );
};

export default SingleProduct;
