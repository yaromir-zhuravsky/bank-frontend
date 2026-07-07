import { Form } from 'react-router'

export function LoginForm() {
  return (
    <Form method="post">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <button type="submit">Submit</button>
    </Form>
  )
}
