import { useGetSingleProductQuery } from '../API/mindfulHarvestApi';

const GuestCartItem = (props) => {
    const itemObj = props.itemObj

    const {data, error, isLoading} = useGetSingleProductQuery(itemObj.productId)
    if(isLoading) {
        return <div>Loading Product ...</div>
    };
    if(error || !data) {
        return <div>Error in showing cart items.</div>
    };

    console.log("guest cart product: ", data)

    return (
        <div>
            <h3>{data.title}</h3>
            <img style={{width: "40%"}} src={data.image} alt={data.title} />
            <p>Price: {" "} ${data.price}</p>
            <p>Quantity: {" "} {itemObj.quantity}</p>
        </div>
    )


};

export default GuestCartItem