import { authTokenStorage, type AuthTokens } from './authTokenStorage'

const apiBaseUrl = 'http://localhost:3000'

let refreshRequest: Promise<AuthTokens> | null = null

export async function apiFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const response = await fetch(input, withAuthorization(init))

  if (response.status !== 401) {
    return response
  }

  const tokens = await refreshTokens()
  authTokenStorage.setTokens(tokens)

  return fetch(input, withAuthorization(init))
}

function withAuthorization(init: RequestInit) {
  const headers = new Headers(init.headers)
  const accessToken = authTokenStorage.getAccessToken()

  headers.set('Cache-Control', 'no-store')

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  return {
    ...init,
    cache: 'no-store' as const,
    headers,
  }
}

async function refreshTokens() {
  refreshRequest ??= requestRefreshTokens().finally(() => {
    refreshRequest = null
  })

  return refreshRequest
}

async function requestRefreshTokens() {
  const refreshToken = authTokenStorage.getRefreshToken()

  if (!refreshToken) {
    authTokenStorage.clear()
    throw new Error('Refresh token is missing')
  }

  const response = await fetch(`${apiBaseUrl}/authentication/refresh`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  })

  if (!response.ok) {
    authTokenStorage.clear()
    throw response
  }

  return response.json() as Promise<AuthTokens>
}
