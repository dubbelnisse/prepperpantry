import jwt from 'jsonwebtoken'
import config from '../config'

export function jwtSign(username: string, email: string) {
  return jwt.sign(
    {
      username: username,
      email: email,
    },
    config.auth.secret,
    {
      expiresIn: config.auth.expiresIn,
    }
  )
}
