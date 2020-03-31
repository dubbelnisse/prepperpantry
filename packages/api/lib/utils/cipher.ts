import crypto from 'crypto'
import config from '../config'

function create128BitIV() {
  const iv = crypto
    .createHash('sha256')
    .update(config.crypto.key)
    .digest()

  const resizedIV = Buffer.allocUnsafe(16)
  iv.copy(resizedIV)

  return resizedIV
}

export function encrypt(str: string) {
  const key = crypto
    .createHash('sha256')
    .update(config.crypto.key)
    .digest()

  const cipher = crypto.createCipheriv('aes256', key, create128BitIV())
  const msg = []

  msg.push(cipher.update(str, 'binary', 'hex'))
  msg.push(cipher.final('hex'))

  return msg.join('')
}

export function decrypt(str: string) {
  try {
    const key = crypto
      .createHash('sha256')
      .update(config.crypto.key)
      .digest()

    const cipher = crypto.createDecipheriv('aes256', key, create128BitIV())
    const msg = []

    msg.push(cipher.update(str, 'hex', 'binary'))
    msg.push(cipher.final('binary'))

    return msg.join('')
  } catch (error) {
    throw new Error(error)
  }
}
