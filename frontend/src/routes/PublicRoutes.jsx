import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPageAndForm from '../pages/LoginPage';
import ContactUsPage from '../pages/ContactUs';
import OurStory from '../pages/AboutUs';
import ProductPage from '../pages/products';
import ProductDetails from '../pages/products-details';
import HomePage from '../pages/HomePage';
import Registration from '../pages/registration-page';
import ForgotPasswordPage from '../pages/forgot-password';
import { AuthGuard } from './RouteGuards'; 
import Practice from '../testing-extras/practice';
// import Testing from '../testing-extras/testing';
import NotFound404 from '../components/feedback-ui/NotFound404';

/**
 * The Public Routes file of B&D African Market, managing all publicly accessible routes.
 * This file defines the routes that do not require user authentication, making them accessible to all visitors.
 * 
 * Routes:
 * - "/": Home page of the site.
 * - "/login": User login page.
 * - "/forgot-password": Password recovery page.
 * - "/contact-us": Page for users to contact the site administration.
 * - "/about-us": Informational page about the site and its background.
 * - "/products": Page listing available products.
 * - "/products/:productName": Detailed view of a specific product.
 * - "/register": User registration page.
 * - "/practice": A route for testing and development purposes.
 * - "/*": A fallback 404 Not Found page for any undefined routes.
 * 
 * Features:
 * 1. AuthGuard: Wraps around certain routes to redirect authenticated users away from login and registration pages.
 * 2. Dynamic Routing: Utilizes path parameters for product details pages.
 * 3. NotFound404: Displays a custom 404 Not Found page for unmatched routes.
 * 
 * Notes:
 * - Regularly update the routes to reflect new pages or changes in the site's structure.
 * - Ensure that the AuthGuard is functioning correctly to prevent authenticated users from accessing login or registration pages.
 */

export const PublicRoutes = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<AuthGuard><LoginPageAndForm /></AuthGuard>} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="about-us" element={<OurStory />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/:productName" element={<ProductDetails />} />
        <Route path="register" element={<AuthGuard><Registration /></AuthGuard>} />
        <Route path="practice" element={<Practice />} />
        <Route path="*" element={<NotFound404 />} />

    </Routes>
);
