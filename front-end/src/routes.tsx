import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/app/home'
import { SignIn } from './pages/auth/sign-in'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { SignUp } from './pages/auth/sign-up'
import { NotFound } from './pages/404'

export const router = createBrowserRouter([ 
  {
    path: '/',
    errorElement: <NotFound/>,
    element: <AppLayout/>,
    children: [{path: '/', element: <Home/> }]
  },
  {
    path: '/',
    element: <AuthLayout/>,
    children: [
      {path: '/sign-in', element: <SignIn/>},
      {path: '/sign-up', element: <SignUp/>}
    
    ]
  },
])