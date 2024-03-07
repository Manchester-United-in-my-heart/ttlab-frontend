import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Login from './routes/login';
import SignUp from './routes/signup-page';
import MFAAuthentication from './routes/verfication-page';
// import Test from './routes/test';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingProvider } from './storage/LoadingContext';
// import App from './App';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/verify-mfa',
    element: <MFAAuthentication />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingProvider>
      <RouterProvider router={router} />
    </LoadingProvider>
  </React.StrictMode>
);
