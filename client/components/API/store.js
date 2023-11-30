import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import mindfulHarvestApi from './mindfulHarvestApi';
import tokenReducer from './tokenSlice';
import cartReducer from './cartSlice';
import adminBooleanReducer from './adminBoolean';
import categoryIdReducer from './categoryIdSlice';
import searchFieldReducer from './searchFieldSlice'

export const store = configureStore({
    reducer: {
        [mindfulHarvestApi.reducerPath]: mindfulHarvestApi.reducer,
        token: tokenReducer,
        cart: cartReducer,
        adminBoolean: adminBooleanReducer,
        categoryId: categoryIdReducer,
        searchField: searchFieldReducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(mindfulHarvestApi.middleware);
    }
})

export default store;
