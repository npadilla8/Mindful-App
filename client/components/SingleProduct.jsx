import React from 'react';
import { useGetSingleProductQuery } from './API/mindfulHarvestApi';
import { useParams, useNavigate } from 'react-router-dom';
import { createNextState } from '@reduxjs/toolkit';

const SingleProduct = () => {
    const { productId } = useParams();
    const {data, error, isLoading} = useGetSingleProductQuery(productId);
    const navigate = useNavigate();

    if(isLoading) {
        return <div>Loading ...</div>
    };
    if(error) {
        return <div>Unable to Get Product</div>
    };

    // const handleAddToCart = async (e) => {
    //     e.preventDefault();

    //     try {
    //         // TODO: fill with what happens when add to cart is clicked
    //     } catch (error) {
    //         console.error(error);
    //     };
    //     navigate('/cart');
    // };

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

            </div>
        </div>
    );
};

export default SingleProduct;
