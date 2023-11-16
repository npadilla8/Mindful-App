import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import mindfulHarvestApi from './mindfulHarvestApi';
import tokenReducer from './tokenSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        [mindfulHarvestApi.reducerPath]: mindfulHarvestApi.reducer,
        token: tokenReducer,
        cart: cartReducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(mindfulHarvestApi.middleware);
    }
})

export default store;
