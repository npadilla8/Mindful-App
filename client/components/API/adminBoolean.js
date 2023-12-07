import {createSlice} from "@reduxjs/toolkit";

const adminBooleanSlice = createSlice({
    name: "adminBoolean",
    initialState:
        localStorage.getItem("isAdmin") === "true"
        ? true
        : false,
    reducers: {
        setAdminBoolean: (state, {payload}) => {
            localStorage.setItem("isAdmin", payload.adminBoolean)
            return payload.adminBoolean
        }
    }
});

export default adminBooleanSlice.reducer;
export const {setAdminBoolean} = adminBooleanSlice.actions;
