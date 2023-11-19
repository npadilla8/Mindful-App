import React, { useState } from 'react';
import { useGetProductsQuery } from './API/mindfulHarvestApi';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const HomePage = () => {
    const [query, setQuery] = useState("");
    const { data, isLoading, error } = useGetProductsQuery();
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Loading</p>;
    }
    if (error) {
        return <p>Error</p>;
    }
    console.log(isLoading? "Loading result" : "from useGetProductsQuery", data.products)

    return (
        <>
            <h3>Products</h3>
            {data && data.length > 0 ? (
                data.map((product) => (
                    <div key={product.id}>
                        <p>{product.title}</p>
                        <p>{product.description}</p>
                        <img src={product.image} alt={product.title} />
                        <Button onClick={() => navigate("/products/" + product.id)} variant="outlined">
              View Details
            </Button>
                    </div>
                ))
            ) : (
                <p>Unable to view products.</p>
            )}
        </>
    );
};
export default HomePage;
