import { useGetSingleProductQuery } from "../API/mindfulHarvestApi";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function OrderItem(props) {
    const orderItem = props.item;
    const { data, error, isLoading } = useGetSingleProductQuery(orderItem.productId);

    if (isLoading) {
        return <CircularProgress sx={{color: 'black', marginTop: "40%", marginLeft: "40%"}} size={75}/>
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
                    <Typography variant="body1"><b>{data.title}</b></Typography>
                    <Typography variant="body1">{data.description}</Typography>
                    <br />
                    <Typography variant="body1"><b>Price</b> ${data.price}</Typography>
                    <Typography variant="body1"><b>Qty</b> {orderItem.quantity}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}