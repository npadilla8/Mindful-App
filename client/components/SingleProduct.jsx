import React from 'react';
import { useGetSingleProductQuery } from './API/mindfulHarvestApi';
import { useParams, useNavigate } from 'react-router-dom';

const SingleProduct = () => {
    return (
        <div>
            <p>This is the single product page</p>
        </div>
    );
};

export default SingleProduct;
