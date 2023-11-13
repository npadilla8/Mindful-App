import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const mindfulHarvestApi = createApi({
    reducerPath: "mindfulHarvestApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",

        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-Type", "application/json");
            const {token} = getState();

            if(token){
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: (builder) => ({
        //---------------->USER ENDPOINTS<---------------------//

        //GET /api/users - get all users without their passwords
        getUsers: builder.query({
            query: () => "/api/users",
        }),
        //GET /api/users/cart - get individual shoppers with carts
        getUserWithCart: builder.query({
            query: () => "/api/users/cart",
        }),
        //POST /api/users/register - register new user (empty cart also created)
        registerUser: builder.mutation({
            query: (user) => ({
                url: "/api/users/register",
                method: "POST",
                body: user,
            })
        }),
        //POST /api/users/login - login existing user 
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/api/users/login",
                method: "POST",
                body: user,
            })
        }),

        //----------------->PRODUCT ENDPOINTS<----------------------//

    })
});

export default mindfulHarvestApi;
export const {
    useGetUsersQuery,
    useGetUserWithCartQuery,
    useRegisterUserMutation,
    useLoginUserMutation,

} = mindfulHarvestApi;