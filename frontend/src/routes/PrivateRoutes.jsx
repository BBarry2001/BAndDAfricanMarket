import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccountPage from '../pages/account';
import CheckoutMultiStepForm from '../pages/checkout'; 
import NotFound404 from '../components/feedback-ui/NotFound404';

/**
 * Private Routes File for B&D African Market.
 * Manages routes that are accessible only to authenticated/logged in users.
 * 
 * Features:
 * - AccountPage: A user's account overview and settings page.
 * - CheckoutMultiStepForm: A multi-step form for handling the checkout process.
 * - NotFound404: A custom 404 Not Found page for unmatched private routes.
 * 
 * Routes:
 * - "/account": The user account management page.
 * - "/checkout": The checkout process for purchases.
 * - "/*": Fallback route for any undefined private routes, displaying a custom 404 page.
 * 
 * Notes:
 * - Ensure that the routes in this file require user authentication.
 * - Update the routes as new features or pages are added to the user's private area.
 */

export const PrivateRoutes = () => (
    <Routes>
        <Route path="/account" element={<AccountPage />} />
        <Route path="/checkout" element={<CheckoutMultiStepForm />} />
        <Route path="*" element={<NotFound404 />} />

    </Routes>
);
