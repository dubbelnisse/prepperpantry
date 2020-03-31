import configPackage from '@iteam/config'

interface Server {
  port: number
}

interface Crypto {
  key: string
}

interface Auth {
  secret: string
  expiresIn: string
}

interface Db {
  host: string
  port: number
  user: string
  password: string
  database: string
}

export interface Config {
  server: Server
  crypto: Crypto
  auth: Auth
  db: Db
}

const config = configPackage({
  file: `${__dirname}/../config.json`,
  defaults: {
    server: {
      port: 4000,
    },
    crypto: {
      key: 'secretcryptokey',
    },
    auth: {
      secret:
        'This is a long default key that needs to be changed in production',
      expiresIn: '3h',
    },
    db: {
      host: '127.0.0.1',
      port: 5432,
      user: 'prepper',
      password: 'this-is-secure',
      database: 'prepperpantry',
    },
  },
})

export default {
  server: config.get('server'),
  crypto: config.get('crypto'),
  auth: config.get('auth'),
  db: config.get('db'),
} as Config
