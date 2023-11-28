/**
 * @jest-enviornment jsdom
 */

import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import AdminAccountPage from "../components/AdminAccount/AdminAccountPage";
import Users from "../components/AdminAccount/Users";
import AllProducts from "../components/AdminAccount/AllProducts";
import "@testing-library/jest-dom";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

//const middlewares =[thunk]
//const mockStore = configureMockStore();
//const store = mockStore({token: "token", adminBoolean: true})

describe("AdminAccountPage omponent", () => {

    test.only("displays list of all users", () => {
        const initialState = {
            mindfulHarvestApi: "mindfulharvestapi",
            token: "token",
            adminBooolean :true
        };
    
        const mockStore = configureMockStore();
        const appStore = mockStore(initialState)
        render(<Provider store={appStore}>
            <MemoryRouter>
        {/* <AdminAccountPage /> */}
        <Users />
        {/* <AllProducts /> */}
        </MemoryRouter>
        </Provider>
        );
     

        const usersHeading = screen.getByRole("heading", {name: "List of Registered Users"});
        expect(usersHeading).toBeInTheDocument();




    })
})