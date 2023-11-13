//test comment - will delete later after I know git pull is working 

import { createSlice } from "@reduxjs/toolkit";
import mindfulHarvestApi from "./mindfulHarvestApi";

const tokenSlice = createSlice({
    name: "token",
    initialState: null,
    reducers: {
        setToken: (state, { payload }) => {
            return payload.token
        }
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            mindfulHarvestApi.endpoints.registerUser.matchFulfilled,
            (state, { payload }) => payload.token
        );

        builder.addMatcher(
            mindfulHarvestApi.endpoints.loginUser.matchFulfilled,
            (state, {payload}) => payload.token
        )
    }
});



export default tokenSlice.reducer;

export const {setToken} = tokenSlice.actions;
