import { config } from 'dotenv'

config()

export const env = {
  port: parseInt(process.env.PORT!) || 3000,
  mongoUri: process.env.MONGO_URI?.toString(),
  jwt: {
    secret: process.env.JWT_SECRET?.toString(),
    expiresIn: process.env.JWT_EXPIRES_IN?.toString()
  },
  saltFactor: parseInt(process.env.SALT_FACTOR!)
}