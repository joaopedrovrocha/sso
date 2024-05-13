import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Middleware } from './middleware/middleware';
import { CallbackPage } from './pages/callback/callback.page';
import { HomePage } from './pages/home/home.page';

const router = createBrowserRouter([
  { path: '/', element: <Middleware><HomePage /></Middleware> },
  { path: '/callback', element: <Middleware><CallbackPage /></Middleware> },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);