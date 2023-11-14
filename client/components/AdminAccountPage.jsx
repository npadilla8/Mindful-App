import {React, useState} from "react";
import {useAddProductMutation} from "./API/mindfulHarvestApi";
import {useUpdateProductMutation} from "./API/mindfulHarvestApi";
import { useGetUsersQuery } from "./API/mindfulHarvestApi";

const AdminAccountPage = () => {
    // const {data, error, isLoading} = useGetUsersQuery();

    // if(isLoading) {
    //     return <div>Loading ...</div>
    // };
    // if(error) {
    //     return <div>Error: {error.message}</div>
    // }

    return (
        <>
        <p>Admin page</p>
        {/* <div>
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
                <p> {error.message} </p>
            )}
        </div> */}
        </>
    );
}

export default AdminAccountPage;
