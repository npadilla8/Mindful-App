import {createSlice} from "@reduxjs/toolkit";

const adminBooleanSlice = createSlice({
    name: "adminBoolean",
    initialState: false,
    reducers: {
        setAdminBoolean: (state, {payload}) => {
            return payload.adminBoolean
        }
    }
});

export default adminBooleanSlice.reducer;
export const {setAdminBoolean} = adminBooleanSlice.actions;