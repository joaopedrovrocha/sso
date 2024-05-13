import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.context';
import { PublicMiddleware } from './middleware/auth.middleware';
import { CheckMePage } from './pages/check-me/check-me.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { LogoutPage } from './pages/logout/logout.page';
import { Unauthorized } from './pages/not-authorized/not-authorized.page';
import { NotFound } from './pages/not-found/not-found.page';
import { RegisterPage } from './pages/register/register.page';

const router = createBrowserRouter([
  { path: '/', element: <PublicMiddleware><HomePage /></PublicMiddleware> },
  { path: '/check-me', element: <PublicMiddleware><CheckMePage /></PublicMiddleware> },
  { path: '/login', element: <PublicMiddleware><LoginPage /></PublicMiddleware> },
  { path: '/register', element: <PublicMiddleware><RegisterPage /></PublicMiddleware> },
  { path: '/logout', element: <PublicMiddleware><LogoutPage /></PublicMiddleware> },

  { path: '/404', element: <NotFound /> },
  { path: '/401', element: <Unauthorized /> },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);