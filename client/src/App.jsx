import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  HomeLayout,
  Stats,
  Landing,
  Profile,
  Register,
  Login,
  Error,
  DashboardLayout,
  AddJob,
  AllJobs,
  Admin,
} from './pages'

import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'

export const checkDefaultTheme = () => {
  const preferredTheme = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme || preferredTheme
}
checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}
export default App
