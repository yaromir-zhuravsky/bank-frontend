import { redirect, type ActionFunctionArgs } from 'react-router'
import { login } from '../../../features/auth/login'
import { authTokenStorage } from '../../../shared/api'

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  const response = await login({ email, password })

  if (!response.ok) {
    throw response
  }

  const tokens = await response.json()
  authTokenStorage.setTokens(tokens)

  return redirect('/')
}
