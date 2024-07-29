import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import Root from './routes/Root.tsx';
import BookList from './routes/BookList.tsx';
import './styles/main.scss';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'book-list/:subject',
                element: <BookList />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)

//  review css modules, global variables / style hero 
//  review loading, fetch / error style images
//  module for useStates
//  draw architecture

//  load mystery category initially
//  error page
//  search book ==> BookList
//  search subject ==> BookList
//  categoryNav component

//  loader data in router, optimize fetch
//  router component, router review, context

//  testing

//  "BookNest"
