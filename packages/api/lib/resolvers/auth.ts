import { gql, AuthenticationError } from 'apollo-server-express'
import { Resolvers } from '../__generated__/graphql'
import { encrypt } from '../utils/cipher'
import { jwtSign } from '../utils/auth'

export const typeDefs = gql`
  type Token {
    token: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    register(input: RegisterInput!): Token!
    login(input: LoginInput!): Token!
  }
`

export const resolvers: Resolvers = {
  Mutation: {
    register: async (_, { input }, { db }) => {
      try {
        await db('users').insert({
          email: input.email,
          username: input.username,
          password: encrypt(input.password),
        })

        const token = jwtSign(input.username, input.email)

        return {
          token,
        }
      } catch (err) {
        throw new AuthenticationError('Something went wrong')
      }
    },
    login: async (_, { input }, { db }) => {
      try {
        const user = await db
          .select('username', 'email', 'password')
          .from('users')
          .where('email', input.email)
          .first()

        if (encrypt(input.password) !== user.password) {
          throw new AuthenticationError('Wrong email or password')
        }

        const token = jwtSign(user.username, user.email)

        return {
          token,
        }
      } catch (err) {
        throw new AuthenticationError('Something went wrong')
      }
    },
  },
}
