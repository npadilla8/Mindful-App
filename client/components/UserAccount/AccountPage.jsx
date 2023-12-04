import React from 'react';
import OrderItem from './OrderItem';
import { useNavigate } from 'react-router-dom';
import { useGetUserWithCartQuery } from '../API/mindfulHarvestApi';
import { useGetUserOrderHistoryQuery } from '../API/mindfulHarvestApi';
import { useSelector } from "react-redux";

const AccountPage = () => {
    const token = useSelector(state => state.token);
    const { data, error, isLoading } = useGetUserWithCartQuery();
    const { data: orderHistory, error: orderError, isLoading: orderLoading } = useGetUserOrderHistoryQuery();
    const navigate = useNavigate();

    console.log("userwithcart:", data);

    // conditional rendering based on what is happening to userwithcart query
    if (isLoading) {
        return <div>Loading user information...</div>
    };
    if (error || !data) {
        return <div>Unable to get user information. </div>
    };

    // conditional rendering based on what is happening to orderhistory query
    if (orderLoading) {
        return <div>Loading user's order history...</div>
    };
    if (orderError || !orderHistory) {
        return <div>Error in getting order history.</div>
    };

    console.log(orderHistory)

    if (!token) {
        // Redirect to login page if not signed in
        navigate('/login');
        return null; // Prevent rendering content when redirecting
    };

    return (
        <>
            <div className="accountDetails">
                {data ? (
                    <div>
                        <h3>Welcome Back, {data.username}!</h3>
                        <h4>Account Details</h4>
                        <p><b>Username:</b> {data.username}</p>
                        <p><b>Email: </b>{data.email}</p>
                    </div>
                ) : (
                    <p>User information not available.</p>
                )}
            </div>
            <br />
            <div className="orderHistory">
                <h4>Order History</h4>
                {orderHistory.listOfOrders && orderHistory.listOfOrders.length > 0 ? (
                    orderHistory.listOfOrders.map((order) => {
                        const date = new Date(order.createdAt).toLocaleDateString();
                        return (
                            <div key={order.id} className="individualOrder">
                                <p><b>Order Date:</b> {date}</p>
                                <p><b>Status:</b> {order.status}</p>
                                <p><b>Total Price:</b> ${order.totalAmount}</p>
                                {order.items.map((item) => (
                                    <OrderItem key={item.id} item={item} />))
                                }
                                <br />
                            </div>
                        )
                    })
                ) : (
                    <p> You have no order history at this time.</p>
                )}
            </div>
        </>
    );
}

export default AccountPage;
