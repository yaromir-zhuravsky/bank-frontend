import { redirect } from 'react-router'
import { LogoutButton } from '../components/LogoutButton'
import { getCurrentUser } from '../lib/session'
import { logout } from '../lib/logout'
import { authTokenStorage } from '../lib/auth'

export function HomePage() {
  return (
    <main>
      <h1>Home</h1>
      <LogoutButton />
    </main>
  )
}

export async function homeLoader() {
  let response: Response

  try {
    response = await getCurrentUser()
  } catch {
    return redirect('/login')
  }

  if (response.ok) {
    return null
  }

  if (response.status === 401) {
    return redirect('/login')
  }

  throw response
}

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
