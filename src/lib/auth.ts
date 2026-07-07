export type AuthTokens = {
  access_token: string
  refresh_token: string
}

const refreshTokenStorageKey = 'refresh_token'
const accessTokenStorageKey = 'access_token'

let accessToken: string | null = null

function getLocalStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage
}

function getSessionStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.sessionStorage
}

export const authTokenStorage = {
  getAccessToken() {
    accessToken ??= getSessionStorage()?.getItem(accessTokenStorageKey) ?? null

    return accessToken
  },

  getRefreshToken() {
    return getLocalStorage()?.getItem(refreshTokenStorageKey) ?? null
  },

  setTokens(tokens: AuthTokens) {
    accessToken = tokens.access_token
    getSessionStorage()?.setItem(accessTokenStorageKey, tokens.access_token)
    getLocalStorage()?.setItem(refreshTokenStorageKey, tokens.refresh_token)
  },

  clear() {
    accessToken = null
    getSessionStorage()?.removeItem(accessTokenStorageKey)
    getLocalStorage()?.removeItem(refreshTokenStorageKey)
  },
}
