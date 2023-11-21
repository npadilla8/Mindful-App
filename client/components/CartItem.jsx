import { useState } from "react";
import { useGetSingleProductQuery } from "./API/mindfulHarvestApi";
import { useUpdateQuantityOfCartItemMutation } from "./API/mindfulHarvestApi";

const CartItem = (props) => {
    const item = props.item;
    const handleCartItemRemoval = props.onDelete

    const [quantity, setQuantity] = useState(item.quantity)
    const [updateQuantityOfCartItem] = useUpdateQuantityOfCartItemMutation();

    const { data: singleProductData, error: productError, isLoading: productIsLoading } = useGetSingleProductQuery(item.productId);

    if (productIsLoading) {
        return <div>Loading product...</div>;
    };

    if (productError || !singleProductData) {
        return <div>Error in showing cart item.</div>;
    };

    async function handleEditItemQuantity(event) {
        event.preventDefault();

        const response = await updateQuantityOfCartItem({
            cartItemId: item.id,
            quantity: Number(quantity),
        });
        console.log("cart item quanity change: ", response)
    }

    return (
        <div key={item.id}>
            <p><b>{singleProductData.title}</b></p>
            <img style={{ width: "40%" }} src={singleProductData.image} alt={singleProductData.title} />
            <p>Price: ${singleProductData.price}</p>
            <p>Quantity: {item.quantity}</p>
            <label>Quantity: {" "}
                <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </label>
            <button onClick={handleEditItemQuantity}>Edit</button>
            <br />
            <br />
            <button onClick={() => handleCartItemRemoval(item.id)}>Remove</button>
        </div>
    );
};

export default CartItem