import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const mindfulHarvestApi = createApi({
    reducerPath: "mindfulHarvestApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "",

        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-Type", "application/json");
            const {token} = getState();

            if(token){
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: (builder) => ({
        
    })
});

export default mindfulHarvestApi;