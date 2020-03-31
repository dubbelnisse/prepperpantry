import { gql } from 'apollo-server-express'
import { Resolvers } from '../__generated__/graphql'

export const typeDefs = gql`
  type PantryItem {
    id: String!
    name: String!
    quantity: Int!
    volume: String!
    expire: DateTime!
  }

  input AddPantryItemInput {
    name: String!
    quantity: Int!
    volume: String!
    expire: DateTime!
  }

  input DeletePantryItemInput {
    id: String!
  }

  extend type Query {
    pantry: [PantryItem]! @isAuthenticated
  }

  extend type Mutation {
    addPantryItem(input: AddPantryItemInput!): Boolean! @isAuthenticated
    deletePantryItem(input: DeletePantryItemInput!): Boolean! @isAuthenticated
  }
`

export const resolvers: Resolvers = {
  Query: {
    pantry: async (_, _args, { auth, db }) => {
      const user = await db
        .select('id')
        .from('users')
        .where('email', auth.email)
        .first()

      const pantryItems = await db
        .select('id', 'name', 'quantity', 'volume', 'expire')
        .from('pantry')
        .where('user_id', user.id)

      return pantryItems
    },
  },
  Mutation: {
    addPantryItem: async (_, { input }, { auth, db }) => {
      const user = await db
        .select('id')
        .from('users')
        .where('email', auth.email)
        .first()

      await db('pantry').insert({
        name: input.name,
        expire: input.expire,
        quantity: input.quantity,
        volume: input.volume,
        user_id: user.id,
      })

      return true
    },
    deletePantryItem: async (_, { input }, { auth, db }) => {
      const user = await db
        .select('id')
        .from('users')
        .where('email', auth.email)
        .first()

      await db
        .del()
        .from('pantry')
        .where({
          id: input.id,
          user_id: user.id,
        })

      return true
    },
  },
}
