import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <App /> }, { path: "/about", element: <div>About Page</div> }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>

      <RouterProvider router={router} ></RouterProvider>
    </Provider>
  </React.StrictMode>,
)
