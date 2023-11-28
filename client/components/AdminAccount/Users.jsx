import React from "react";
import { useGetUsersQuery } from "../API/mindfulHarvestApi";
import '../CSS/adminpage.css';

const Users = () => {
    const { data, error, isLoading } = useGetUsersQuery();

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    if (error) {
        return <div>Special Permissions Needed to Access Page</div>;
    }

    console.log(data);

    return (
        <div className="UsersContainer">
            <h3 className="UsersHeading">List of Registered Users</h3>
            <div>
                {data ? (
                    data.map((user) => {
                        return (
                            <div key={user.id} className="UserItem">
                                <p className="UserId">Id: {user.id}</p>
                                <p className="UserName">Username: {user.username}</p>
                                <p className="UserEmail">Email: {user.email}</p>
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