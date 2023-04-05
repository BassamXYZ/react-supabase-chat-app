import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Error from './components/Error'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './main.css'
import { AppContextProvider } from './context/appContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
   {
    path: '/signup',
    element: <SignUp />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router}/>
    </AppContextProvider>
  </React.StrictMode>,
)
