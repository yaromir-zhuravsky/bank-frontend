import { apiFetch } from '../../../shared/api'

export function getCurrentUser() {
  return apiFetch('http://localhost:3000/authentication/me')
}
