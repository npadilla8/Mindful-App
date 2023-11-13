import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import mindfulHarvestApi from './mindfulHarvestApi';
import tokenReducer from './tokenSlice'


export const store = configureStore({
    reducer: {
        [mindfulHarvestApi.reducerPath]: mindfulHarvestApi.reducer,
        token: tokenReducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(mindfulHarvestApi.middleware);
    }
})

export default store;