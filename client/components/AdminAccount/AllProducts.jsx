import { React } from "react"
import { useGetProductsQuery } from "../API/mindfulHarvestApi"
import { useDeleteProductMutation } from "../API/mindfulHarvestApi";
import {useNavigate} from 'react-router-dom';


export default function AllProducts() {
    const { data, error, isLoading } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();

    const navigate = useNavigate();

    //handling error and loading states for getProductsQuery
    if (isLoading) {
        return <div>Loading ...</div>
    };
    if (error) {
        return <div>Unable to Get Products</div>
    };
    console.log(data);
    
    //onClick function to delete product using function from delete mutation
    async function adminDeleteProduct(productId) {
        try {
            const response = await deleteProduct(productId);
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <h3>Products for Sale</h3>
            {data ? (
                data.map((product) => {
                    return (
                        <div key={product.id}>
                            <p>Title: {product.title}</p>
                            <p>Description: {product.description}</p>
                            <img style={{ width: '30%' }} src={product.image} alt={product.title} />
                            <button onClick={() => (navigate(`/adminEdit/${product.id}`))}>Edit</button>
                            <button onClick={() => adminDeleteProduct(product.id)}>Delete</button>


                        </div>
                    )
                })
            ) : (
                <p>Unable to View Products.</p>
            )}
        </>
    )
}