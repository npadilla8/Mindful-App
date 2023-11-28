import {createSlice} from "@reduxjs/toolkit";

const categoryIdSlice = createSlice({
    name: "categoryId",
    initialState: null,
    reducers: {
        setCategoryId: (state, {payload}) => {
            return payload.categoryId
        }
    }
});

export default categoryIdSlice.reducer;
export const {setCategoryId} = categoryIdSlice.actions;