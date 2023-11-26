import { useSelector } from 'react-redux'
import { useGetUserWithCartQuery } from '../API/mindfulHarvestApi';

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
        if ((data.cart.items).length < 1) {
            return <h4>Please add items to your cart to complete a purchase.</h4>
        };

        return (
            <div>
                <h3>Thank you for your order, {data.username}!</h3>
                <p><b>Order Number:</b> AUK89076896</p>
                <p><b>Order Date:</b> {formattedDate}</p>
                <p><b>Order Time:</b> {formattedTime}</p>
                <p>A summary of your order has been sent to {data.email}.</p>
            </div>
        )

    } else {
        if (guestCart.length < 1) {
            return <h4>Please add items to your cart to complete a purchase.</h4>
        } else {
            return (
                <div>
                    <h3>Thank you for your order!</h3>
                    <p><b>Order Number:</b> AUK89076896</p>
                    <p><b>Order Date:</b> {formattedDate}</p>
                    <p><b>Order Time:</b> {formattedTime}</p>
                    <p>A summary of your order has been sent to your email.</p>
                </div>
            )
        }
    }
}

export default ConfirmationPage