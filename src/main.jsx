import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Login from './routes/login';
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
  // {
  //   path: '/test',
  //   element: <Test />,
  // },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingProvider>
      <RouterProvider router={router} />
    </LoadingProvider>
  </React.StrictMode>
);
