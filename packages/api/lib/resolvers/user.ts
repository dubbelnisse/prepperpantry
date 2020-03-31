import { gql } from 'apollo-server-express'
import { Resolvers } from '../__generated__/graphql'

export const typeDefs = gql`
  type User {
    username: String!
    email: String!
  }

  extend type Query {
    user: User! @isAuthenticated
  }
`

export const resolvers: Resolvers = {
  Query: {
    user: async (_, _args, { auth, db }) =>
      db
        .select('username', 'email')
        .from('users')
        .where('email', auth.email)
        .first(),
  },
}
