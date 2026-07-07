import { apiFetch } from './api'

export function getCurrentUser() {
  return apiFetch(`${import.meta.env.VITE_API_BASE_URL}/authentication/me`)
}
