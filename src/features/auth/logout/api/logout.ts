import { apiFetch, authTokenStorage } from '../../../../shared/api'

export function logout() {
  const refreshToken = authTokenStorage.getRefreshToken()

  return apiFetch('http://localhost:3000/authentication/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        refresh_token: refreshToken,
      }
    }),
  })
}
