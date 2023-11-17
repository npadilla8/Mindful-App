import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        setCart: (state, { payload }) => {
            state.push({
                productId: payload.productId,
                quantity: payload.quantity
            });
        }
    },
});

export default cartSlice.reducer;

export const {setCart} = cartSlice.actions;

