import { TypeOf, object, string } from 'zod';

const login = {
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
}

export const loginSchema = object({
  ...login
})

export type LoginInput = TypeOf<typeof loginSchema>;