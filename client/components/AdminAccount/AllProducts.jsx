import {React} from "react"
import {useGetProductsQuery} from "../API/mindfulHarvestApi"


export default function AllProducts(){
    const {data, error, isLoading} = useGetProductsQuery();

    if(isLoading) {
        return <div>Loading ...</div>
    };
    if(error) {
        return <div>Unable to Get Products</div>
    };

    console.log(data)


    return(
        <>
        <h3>Products for Sale</h3>
        {data ? (
            data.map((product) => {
                return (
                    <div key={product.id}>
                        <p>Title: {product.title}</p>
                        <p>Description: {product.description}</p>
                        <img style={{width: '30%'}} src={product.image} alt={product.title}/>
                        <button>Edit</button>
                        <button>Delete</button>

                
                    </div>
                )
            })
        ): (
            <p>Unable to View Products.</p>
        )}
        </>
    )
}