type LoginCredentials = {
  email: string
  password: string
}

export function login({ email, password }: LoginCredentials) {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authentication: {
        email,
        password,
      },
    }),
  })
}
