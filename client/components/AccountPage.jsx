import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserWithCartQuery } from './API/mindfulHarvestApi';
import { useSelector } from "react-redux";

const AccountPage = () => {
    const token = useSelector(state => state.token);
    const { data, error, isLoading } = useGetUserWithCartQuery();
    const navigate = useNavigate();

    console.log("userwithcart:", data);

    if (isLoading) {
        return <div>Loading...</div>
    };
    if (error) {
        return <div>Unable to Get User Information. </div>
    };
    if (!token) {
        // Redirect to login page if not signed in
        navigate('/login');
        return null; // Prevent rendering content when redirecting
    };

    return (
        <>
            <div>
                {data ? (
                    <div>
                        <h3>Welcome Back, {data.username}</h3>
                        <h4>Account Details</h4>
                        <p><b>Username:</b> {data.username}</p>
                        <p><b>Email: </b>{data.email}</p>
                    </div>
                ) : (
                    <p>User information not available.</p>
                )}
            </div>
        </>
    );
}

export default AccountPage;
