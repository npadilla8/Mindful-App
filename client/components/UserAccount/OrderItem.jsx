import { useGetSingleProductQuery } from "../API/mindfulHarvestApi";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

export default function OrderItem(props) {
    const orderItem = props.item;
    const { data, error, isLoading } = useGetSingleProductQuery(orderItem.productId);

    if (isLoading) {
        return <Typography variant="body1">Product is loading...</Typography>
    };
    if (error || !data) {
        return <Typography variant="body1">Single product information is not being fetched.</Typography>
    };

    return (
        <Box key={orderItem.id} sx={{ flexGrow: 1 }} style={{ padding: '2%' }}>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <img style={{ width: '50%', height: '100%' }} src={data.image} alt={data.title} />
                </Grid>
                <Grid item xs={6}>
                    <Typography><b>{data.title}</b></Typography>
                    <Typography>{data.description}</Typography>
                    <br />
                    <Typography><b>Price</b> ${data.price}</Typography>
                    <Typography><b>Qty</b> {orderItem.quantity}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}