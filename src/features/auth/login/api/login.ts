type LoginCredentials = {
  email: string
  password: string
}

export function login({ email, password }: LoginCredentials) {
  return fetch('http://localhost:3000/authentication/login', {
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
