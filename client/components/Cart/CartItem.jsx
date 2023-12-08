import { useState } from "react";
import { useGetSingleProductQuery } from "../API/mindfulHarvestApi";
import { useUpdateQuantityOfCartItemMutation } from "../API/mindfulHarvestApi";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = (props) => {
    const item = props.item;
    const handleCartItemRemoval = props.onDelete;

    const [quantity, setQuantity] = useState(item.quantity);
    const [updateQuantityOfCartItem] = useUpdateQuantityOfCartItemMutation();

    const { data: singleProductData, error: productError, isLoading: productIsLoading } = useGetSingleProductQuery(item.productId);

    if (productIsLoading) {
        return <div>Loading product...</div>;
    }

    if (productError || !singleProductData) {
        return <div>Error in showing cart item.</div>;
    }

    async function handleEditItemQuantity(event) {
        event.preventDefault();

        if(quantity >= 1) {
            const response = await updateQuantityOfCartItem({
                cartItemId: item.id,
                quantity: Number(quantity),
            });
        };
    }

    return (
        <div key={item.id}>
            <p><b>{singleProductData.title}</b></p>
            <img style={{ width: "40%" }} src={singleProductData.image} alt={singleProductData.title} />
            <p>Price: $ {singleProductData.price * item.quantity} {' ($ '} {singleProductData.price} {'per item)'}</p>
            <p>Quantity: {item.quantity}</p>

            <label>Quantity: {" "}
                <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </label>

            {/* Edit Icon */}
            <IconButton onClick={handleEditItemQuantity}>
                <EditIcon color="black" />
            </IconButton>

            {/* Remove Icon */}
            <IconButton onClick={() => handleCartItemRemoval(item.id)}>
                <DeleteIcon color="black" />
            </IconButton>
        </div>
    );
};

export default CartItem;
