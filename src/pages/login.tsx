import { redirect, type ActionFunctionArgs } from 'react-router'
import { LoginForm } from '../components/LoginForm'
import { login } from '../lib/login'
import { authTokenStorage } from '../lib/auth'

export function LoginPage() {
  return (
    <main>
      <h1>Login</h1>
      <LoginForm />
    </main>
  )
}

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
