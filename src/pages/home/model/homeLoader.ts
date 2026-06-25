import { redirect } from 'react-router'
import { getCurrentUser } from '../../../entities/session'

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
