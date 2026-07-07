import { apiFetch } from './api'
import { authTokenStorage } from './auth'

export function logout() {
  const refreshToken = authTokenStorage.getRefreshToken()

  return apiFetch(`${import.meta.env.VITE_API_BASE_URL}/authentication/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        refresh_token: refreshToken,
      },
    }),
  })
}
