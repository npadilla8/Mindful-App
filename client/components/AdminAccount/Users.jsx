import React from "react";
import { useGetUsersQuery } from "../API/mindfulHarvestApi";
import { useSelector } from "react-redux"
import '../CSS/adminpage.css';

const Users = () => {
    const adminBoolean = useSelector(state => state.adminBoolean);
    if (adminBoolean === false) {
        return (
            <p className ="permissionMessage">
                Need Special Permissions to Access Page.
            </p>
        )
    }
    const { data, error, isLoading } = useGetUsersQuery();

    if (isLoading) {
        return <div>Loading ...</div>;
    };
    if (error || !data) {
        return <div>Unable to load users.</div>;
    };

    console.log(data);

    return (
        <div className="UsersContainer">
            <h2 classNme="AdminHeading">Welcome Back, Administrator!</h2>
            <h3 className="UsersHeading">List of Registered Users</h3>
            <div>
                {data ? (
                    data.map((user) => {
                        return (
                            <div key={user.id} className="UserItem">
                                <p className="UserId">Id: {user.id}</p>
                                <p className="UserName">Username: {user.username}</p>
                                <p className="UserEmail">Email: {user.email}</p>
                                <p className="UserStatus">Admin Status: {user.isAdmin ? "Yes" : "No" }</p>
                            </div>
                        );
                    })
                ) : (
                    <p>Unauthorized Access</p>
                )}
            </div>
        </div>
    );
}

export default Users;