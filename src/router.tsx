import { createBrowserRouter } from 'react-router'
import { App } from './app/App'
import { HomePage, homeAction, homeLoader } from './pages/home'
import { LoginPage, loginAction } from './pages/login'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: homeLoader,
        action: homeAction,
      },
      {
        path: 'login',
        Component: LoginPage,
        action: loginAction,
      },
    ],
  },
])
