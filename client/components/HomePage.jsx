import { React } from 'react';

import { useGetProductsQuery } from './API/mindfulHarvestApi';

const HomePage = () => {
    const {data, isLoading, error} = useGetProductsQuery();

    if (isLoading) {
        return <p> Loading </p>
    }

    if (error) {
        return <p> error </p>
    }

    console.log(isLoading? "Loading result" : "from useGetProductsQuery", data.products);

    return (
        <>
        <h3>Products</h3>
        {data ? (
            data.map((product) => {
                return (
                    <div key={product.id}>
                        <p> {product.title}</p>
                        <p> {product.description}</p>
                        <img style={{width: '30%'}} src={product.image} alt={product.title}/>
                        <button>Buy Now</button>
                      
                
                    </div>
                )
            })
        ): (
            <p>Unable to View Products.</p>
        )}
        </>
                    <Link to="/login"> Got to Login </Link>
            </div>
        </div>
    );
};

export default HomePage;
