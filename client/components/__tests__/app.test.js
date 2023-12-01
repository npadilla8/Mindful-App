/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, sreen, fireEvent } from '@testing-library/react';
import App from '../../App';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../API/store';

describe('App component is rendering', () => {
    test('displays navbar', () => {
        const app = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        const webpageTitle = app.getByText('Mindful Harvest');
        expect(webpageTitle).toBeInTheDocument();
    });
});
