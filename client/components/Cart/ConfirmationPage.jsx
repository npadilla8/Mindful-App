import { useSelector } from 'react-redux'
import { useGetUserWithCartQuery } from '../API/mindfulHarvestApi';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';

const ConfirmationPage = () => {
    const token = useSelector((state) => state.token);
    const guestCart = useSelector((state) => state.cart)

    //to display current date and time for order
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();


    if (token) {
        const { data, error, isLoading } = useGetUserWithCartQuery();

        if (isLoading) {
            return <div>Loading...</div>
        };
        if (error || !data) {
            return <div>Unable to get user with cart.</div>
        };
        if (data.cart === null) {
            return <h3>No cart present to purchase items from.</h3>
        };

        return (
            <Box p={3}>
                <Grid container justifyContent="center">
                    <Grid item>
                <Card> 
                    <CardMedia
                        component="img"
                        image="https://i.pinimg.com/564x/e5/4a/02/e54a0242d2db8a9bd57b590f8cb70698.jpg"
                        style={{ objectFit: 'cover' }}
                        />
                    <CardContent style={{ textAlign: 'center'}}> 

                <Typography variant="h5">Thank you for your order, {data.username}!</Typography>
                <Typography variant="body1"><b>Order Number:</b> AUK89076896</Typography>
                <Typography variant="body1"><b>Order Date:</b> {formattedDate}</Typography>
                <Typography variant="body1"><b>Order Time:</b> {formattedTime}</Typography>
                <Typography variant="body1">A summary of your order has been sent to {data.email}.</Typography>
                     </CardContent>
                </Card>
                </Grid>
                </Grid>
                </Box>
            
        )

    } else {
        return (
            <Box p={3}>
                <Grid container justifyContent="center">
                    <Grid item>
                <Card> 
                    <CardMedia
                        component="img"
                        image="https://i.pinimg.com/564x/e5/4a/02/e54a0242d2db8a9bd57b590f8cb70698.jpg"
                        style={{ objectFit: 'cover' }}
                        />
                    <CardContent style={{ textAlign: 'center'}}> 
                    <Typography variant="h5">Thank you for your order!</Typography>
                    <Typography variant="body1"><b>Order Number:</b> AUK89076896</Typography>
                    <Typography variant="body1"><b>Order Date:</b> {formattedDate}</Typography>
                    <Typography variant="body1"><b>Order Time:</b> {formattedTime}</Typography>
                    <Typography variant="body1">Your order should arrive between 3-5 days.</Typography>
                </CardContent>
                </Card>
                </Grid>
                </Grid>
                </Box>
        )
    }
}

export default ConfirmationPage
