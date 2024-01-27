import { ChakraProvider } from '@chakra-ui/react';
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './global.css';
import Auth from './pages/Auth.page';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home.page';
import { LocalStorage } from './utils/handlers';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      const user = LocalStorage.getUser();
      if (user) return redirect('/dashboard');
      return null;
    },
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const user = LocalStorage.getUser();
      if (user) return redirect('/dashboard');
      return null;
    },
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }

]);


root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
