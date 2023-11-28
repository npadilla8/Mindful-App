import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        setCart: (state, { payload }) => {
            for (let i = 0; i < state.length; i++) {
                if(state[i].productId === payload.productId) {
                    state[i].quantity += payload.quantity;
                    return;
                }
            }
            state.push({
                productId: payload.productId,
                quantity: payload.quantity
            });
        },
        updateCart: (state, { payload }) => {
            for (let i = 0; i < state.length; i++) {
                if(state[i].productId === payload.productId) {
                    return payload;
                }
            }
        }
    },
});

export default cartSlice.reducer;

export const {setCart, updateCart} = cartSlice.actions;

