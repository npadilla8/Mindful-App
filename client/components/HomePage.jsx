import React, { useState } from 'react';
import { useGetProductsQuery } from './API/mindfulHarvestApi';
const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, error } = useGetProductsQuery();
    if (isLoading) {
        return <p>Loading</p>;
    }
    if (error) {
        return <p>Error</p>;
    }
    console.log(isLoading ? "Loading result" : "from useGetProductsQuery", data);
    const handleSearch = () => {
        console.log(`Search query: ${searchQuery}`);
    };
    return (
        <>
            <h3>Products</h3>
            {data && data.length > 0 ? (
                data.map((product) => (
                    <div key={product.id}>
                        <p>{product.title}</p>
                        <p>{product.description}</p>
                        <img src={product.image} alt={product.title} />
                    </div>
                ))
            ) : (
                <p>Unable to view products.</p>
            )}
        </>
    );
};
export default HomePage;
