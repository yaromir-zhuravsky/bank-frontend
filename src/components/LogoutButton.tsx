import { Form } from 'react-router'

export function LogoutButton() {
  return (
    <Form method="post">
      <button type="submit">Logout</button>
    </Form>
  )
}
