import { useState } from "react";
import { useGetSingleProductQuery } from "../API/mindfulHarvestApi";
import { useUpdateQuantityOfCartItemMutation } from "../API/mindfulHarvestApi";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const CartItem = (props) => {
    const item = props.item;
    const handleCartItemRemoval = props.onDelete;

    const [quantity, setQuantity] = useState(item.quantity);
    const [updateQuantityOfCartItem] = useUpdateQuantityOfCartItemMutation();

    const { data: singleProductData, error: productError, isLoading: productIsLoading } = useGetSingleProductQuery(item.productId);

    if (productIsLoading) {
        return <CircularProgress sx={{ color: 'black', marginTop: "40%", marginLeft: "40%" }} size={75} />
    }

    if (productError || !singleProductData) {
        return <div>Error in showing cart item.</div>;
    }

    async function handleEditItemQuantity() {
        if (quantity >= 1) {
            const response = await updateQuantityOfCartItem({
                cartItemId: item.id,
                quantity: Number(quantity),
            });
        };
    }

    function handleEnterKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleEditItemQuantity();
        }
    };

    return (
        <Box key={item.id} sx={{ flexGrow: 1 }} style={{ padding: '2%' }}>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <img style={{ width: "80%", marginRight: '1%' }} src={singleProductData.image} alt={singleProductData.title} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><b>{singleProductData.title}</b></Typography>
                    <Typography variant="body1">{singleProductData.description}</Typography>
                    <br />
                    <Typography variant="body1">Quantity: {item.quantity}</Typography>
                    <br />

                    <Typography variant="body1">
                        <input value={quantity} onChange={(e) => setQuantity(e.target.value)}
                            style={{ padding: '1%', fontSize: '90%' }} onKeyDown={handleEnterKeyPress} />
                    </Typography>
                    <br />

                    <IconButton onClick={handleEditItemQuantity}>
                        <EditIcon color="black" />
                    </IconButton>

                    <IconButton onClick={() => handleCartItemRemoval(item.id)}>
                        <DeleteIcon color="black" />
                    </IconButton>
                </Grid>
                <Grid item xs={2} style={{ marginLeft: '8%' }}>
                    <Typography variant="body1">Price: $ {singleProductData.price * item.quantity}</Typography>
                    <Typography variant="body1">{' ($ '} {singleProductData.price} {'per item)'}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CartItem;
