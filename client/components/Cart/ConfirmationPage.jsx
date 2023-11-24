import {useSelector} from 'react-redux'
import { useGetUserWithCartQuery } from '../API/mindfulHarvestApi';

const ConfirmationPage = () => {
const token = useSelector((state) => state.token);

if(token) {
    const {data, error, isLoading} = useGetUserWithCartQuery();

    if(isLoading) {
        return <div>Loading...</div>
    };
    if(error || !data) {
        return <div>Unable to get user with cart.</div>
    };
    if(data.cart === null) {
        return <div>No cart present to purchase items from.</div>
    };

    //to display current date and time for order
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();




    return (
        <div>
        <h3>Thank you for your order, {data.username}!</h3>
        <p><b>Order Number:</b> AUK89076896</p>
        <p><b>Order Date:</b> {formattedDate}</p>
        <p><b>Order Time:</b> {formattedTime}</p>
        <p>A summary of you order has been sent to {data.email}.</p>
        </div>
    )

}
}

export default ConfirmationPage