import jwt from 'jsonwebtoken'
import { env } from '../config'

export const generateToken = (payload: any): string => {
  console
  const token = jwt.sign(payload, env.jwt.secret!, {
    expiresIn: env.jwt.expiresIn,
  })
  return token
}

export const verifyToken = (token: string): any => {
  const payload = jwt.verify(token, env.jwt.secret!)
  return payload
}