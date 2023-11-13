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
       
        //GET /api/products - get all products
        getProducts: builder.query({
            query: () => "/api/products",
        }),
        //GET /api/products/:productId - get individual product
        getSingleProduct: builder.query({
            query: (productId) => `/api/products/${productId}`
        }),
        //POST /api/products - add new product only allowed for admins
        addProduct: builder.mutation({
            query: (product) => ({
                url: "/api/products",
                method: "POST",
                body: product,
            })
        }),
        //PUT /api/products/:productId - update existing product
        updateProduct: builder.mutation({
            query: (productId, product) => ({
                url: `/api/products/${productId}`,
                method: "PUT",
                body: {productId, product},
            })
        }),
        //DELETE /api/products/:productId - delete product 
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/api/products/${productId}`,
                method: "DELETE",
            })
        }),

        //----------------->CART ITEM ENDPOINTS<--------------------//
        

    })
});

export default mindfulHarvestApi;
export const {
    useGetUsersQuery,
    useGetUserWithCartQuery,
    useRegisterUserMutation,
    useLoginUserMutation,

    useGetProductsQuery,
    useGetSingleProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,

} = mindfulHarvestApi;