import { createSlice } from "@reduxjs/toolkit";
import mindfulHarvestApi from "./mindfulHarvestApi";

const tokenSlice = createSlice({
    name: "token",
    initialState: localStorage.getItem("token"),
    reducers: {
        setToken: (state, { payload }) => {
            return payload.token
        }
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            mindfulHarvestApi.endpoints.registerUser.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem("token", payload.token)
                return payload.token
            }
        );

        builder.addMatcher(
            mindfulHarvestApi.endpoints.loginUser.matchFulfilled,
            (state, {payload}) => {
                localStorage.setItem("token", payload.token)
                return payload.token
            }
        )
    }
});



export default tokenSlice.reducer;

export const {setToken} = tokenSlice.actions;
