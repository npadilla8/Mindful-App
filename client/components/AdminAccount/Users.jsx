import {React} from "react";
import { useGetUsersQuery } from "../API/mindfulHarvestApi";

const Users = () => {
    const {data, error, isLoading} = useGetUsersQuery();

    if(isLoading) {
        return <div>Loading ...</div>
    };
    if(error) {
        return <div>Special Permissions Needed to Access Page</div>
    }

    console.log(data)

    return (
        <>
        <h3>List of Registered Users</h3>
        <div>
            {data ? (
                data.map((user) => {
                    return (
                        <div key={user.id}>
                        <p>Id: {user.id}</p>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        </div>
                    )
                })

            ): (
                <p> Unauthorized Access</p>
            )}
        </div>
        </>
    );
}

export default Users;
