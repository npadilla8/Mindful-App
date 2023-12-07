import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const mindfulHarvestApi = createApi({
    reducerPath: "mindfulHarvestApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",

        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-Type", "application/json");
            const {token} = getState();
            console.log("token " + token);
            if(token){
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: (builder) => ({
        //----------------USER ENDPOINTS---------------------//

        //GET /api/users - get all users without their passwords
        getUsers: builder.query({
            query: () => "/api/users",
            providesTags: ["users"]
        }),
        //GET /api/users/cart - get individual shoppers with carts
        getUserWithCart: builder.query({
            query: () => "/api/users/cart",
            providesTags: ["userwithcart"]
        }),
        //POST /api/users/register - register new user (empty cart also created)
        registerUser: builder.mutation({
            query: (user) => ({
                url: "/api/users/register",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users", "userwithcart", "orderHistory"]
        }),
        //POST /api/users/login - login existing user
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/api/users/login",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["userwithcart", "orderHistory"]
        }),

        //-----------------PRODUCT ENDPOINTS----------------------//

        //GET /api/products - get all products
        getProducts: builder.query({
            query: () => "/api/products",
            providesTags: ["products"]
        }),
        //GET /api/products/:productId - get individual product
        getSingleProduct: builder.query({
            query: (productId) => `/api/products/${productId}`,
            providesTags: ["singleProduct"]
        }),
        //POST /api/products - add new product only allowed for admins
        addProduct: builder.mutation({
            query: (product) => ({
                url: "/api/products",
                method: "POST",
                body: product,
            }),
            invalidatesTags: ["products", "singleProduct"]
        }),
        //PUT /api/products/:productId - update existing product
        updateProduct: builder.mutation({
            query: ({productId, product}) => ({
                url: `/api/products/${productId}`,
                method: "PUT",
                body: product,
            }),
            invalidatesTags: ["singleProduct", "products"]
        }),
        //DELETE /api/products/:productId - delete product
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/api/products/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products", "singleProduct",]
        }),

        //-----------------CART ITEM ENDPOINTS--------------------//

        //POST /api/cartItem/ - add cart items (products) to cart
        addCartItemtoCart: builder.mutation({
            query: ({productId, quantity}) => ({
                url: "/api/cartItem",
                method: "POST",
                body: {productId, quantity},
            }),
            invalidatesTags: ["userwithcart"]
        }),
        //PUT /api/cartItem/:cartItemId - update quanity in cart
        updateQuantityOfCartItem: builder.mutation({
            query: ({cartItemId, quantity}) => ({
                url: `/api/cartItem/${cartItemId}`,
                method: "PUT",
                body: {quantity}
            }),
            invalidatesTags: ["userwithcart"]
        }),
        //DELETE /api/cartItem/:cartItemId - delete cartItem from cart
        deleteCartItemFromCart: builder.mutation({
            query: (cartItemId) => ({
                url: `/api/cartItem/${cartItemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["userwithcart"]
        }),

        //---------------------CART ENDPOINTS-----------------------//

        //GET /api/cart/ - get cart by userId aka req.user.id
        getUserCart: builder.query({
            query: () => "/api/cart",
            providesTags: ["cart"]
        }),
        // DELETE /api/cart/:cartId - delete user's cart **May not want to bc cart only created on registration**
        deleteUserCart: builder.mutation({
            query: (cartId) => ({
                url: `/api/cart/${cartId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["cart", "userwithcart"]
        }),

        //----------------------ORDER ENDPOINTS---------------------//

        // GET /api/order/user/history - get user's order history
        getUserOrderHistory: builder.query({
            query:() => "/api/order/user/history",
            providesTags: ["orderHistory"]
        }),

        // POST /api/order - post new order with orderitems within
        CreateNewOrder: builder.mutation({
            query: () => ({
                url: '/api/order',
                method: "POST"
            }),
            invalidatesTags: ["orderHistory", "userwithcart", "cart"]
        }),
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

    useAddCartItemtoCartMutation,
    useUpdateQuantityOfCartItemMutation,
    useDeleteCartItemFromCartMutation,

    useGetUserCartQuery,
    useDeleteUserCartMutation,

    useGetUserOrderHistoryQuery,
    useCreateNewOrderMutation,

} = mindfulHarvestApi;
