import { redirect } from 'react-router'
import { logout } from '../../../features/auth/logout'
import { authTokenStorage } from '../../../shared/api'

export async function homeAction() {
  try {
    const response = await logout()

    if (!response.ok && response.status !== 401) {
      throw response
    }
  } finally {
    authTokenStorage.clear()
  }

  return redirect('/login')
}
