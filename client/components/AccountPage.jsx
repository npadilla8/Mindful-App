import { Link } from 'react-router-dom';
import { useGetUserWithCartQuery } from './API/mindfulHarvestApi';
import { useSelector } from "react-redux";

const AccountPage = () => {
    const token = useSelector(state => state.token);
    const { data, error, isLoading } = useGetUserWithCartQuery();

    console.log("userwithcart:", data);

    if (isLoading) {
        return <div>Loading...</div>
    };
    if (error) {
        return <div>Unable to Get User Information. </div>
    };
    if (!token) {
        return (
            <h4>Please Sign In {" "}
                <Link style={{ textDecoration: "none" }} to="/login">Here.</Link>
            </h4>
        )
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
