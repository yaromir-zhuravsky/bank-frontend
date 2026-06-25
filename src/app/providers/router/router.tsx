import { createBrowserRouter } from 'react-router'
import { App } from '../../App'
import { homeAction } from '../../../pages/home'
import { homeLoader } from '../../../pages/home'
import { HomePage } from '../../../pages/home'
import { LoginPage, loginAction } from '../../../pages/login'

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
