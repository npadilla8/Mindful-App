import {createSlice} from "@reduxjs/toolkit";

const searchFieldSlice = createSlice({
    name: "searchField",
    initialState: null,
    reducers: {
        setSearchField: (state, {payload}) => {
            return payload.searchField
        }
    }
});

export default searchFieldSlice.reducer;
export const {setSearchField} =  searchFieldSlice.actions;