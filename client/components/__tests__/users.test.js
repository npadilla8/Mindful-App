/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../API/store';
import Users from '../AdminAccount/Users';

describe('<Users/>', () => {
    test('get error message when admin is not logged in', () => {
    
        render(
            <Provider store={store}>
                <BrowserRouter>
                <Users />
                </BrowserRouter>
            </Provider>
        );
        const needPermissionText = screen.getByText("Need Special Permissions to Access Page.");
        expect(needPermissionText).toBeInTheDocument();

    })
})