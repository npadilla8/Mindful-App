import { useGetSingleProductQuery } from '../API/mindfulHarvestApi';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from '../API/cartSlice';

const GuestCartItem = (props) => {
    const itemObj = props.itemObj;
    const [quantity, setQuantity] = useState(itemObj.quantity);
    const dispatch = useDispatch();

    const {data, error, isLoading} = useGetSingleProductQuery(itemObj.productId)
    if(isLoading) {
        return <div>Loading Product ...</div>
    };
    if(error || !data) {
        return <div>Error in showing cart items.</div>
    };

    const handleEditItemQuantity = async (event) => {
        event.preventDefault();

        dispatch(updateCart({
            productId: data.id,
            quantity: Number(quantity)
        }));
    };

    const handleRemoveItem = async (event) => {
        event.preventDefault();

        dispatch(updateCart({
            productId: data.id,
            quantity: 0
        }));
    };

    return (
        <div>
            <h3>{data.title}</h3>
            <img style={{width: "40%"}} src={data.image} alt={data.title} />
            <p>Price: {" "} ${data.price}</p>
            <p>Quantity: {" "} {itemObj.quantity}</p>
            <label>Quantity: {" "}
                <input value={quantity} onChange={(event) => setQuantity(event.target.value)} />
            </label>
            <button onClick={handleEditItemQuantity} >Edit</button>
            <br />
            <br />
            <button onClick={handleRemoveItem} >Remove</button>
        </div>
    )


};

export default GuestCartItem
