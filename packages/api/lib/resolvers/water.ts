import { gql } from 'apollo-server-express'
import { Resolvers } from '../__generated__/graphql'

export const typeDefs = gql`
  type WaterContainer {
    id: String!
    quantity: Int!
    volume: Int!
    expire: DateTime!
  }

  input AddWaterContainerInput {
    quantity: Int!
    volume: Int!
    expire: DateTime!
  }

  input DeleteWaterContainerInput {
    id: String!
  }

  extend type Query {
    water: [WaterContainer]! @isAuthenticated
  }

  extend type Mutation {
    addWater(input: AddWaterContainerInput!): Boolean! @isAuthenticated
    deleteWater(input: DeleteWaterContainerInput!): Boolean! @isAuthenticated
  }
`

export const resolvers: Resolvers = {
  Query: {
    water: async (_, _args, { auth, db }) => {
      const user = await db
        .select('id')
        .from('users')
        .where('email', auth.email)
        .first()

      const waterContainers = await db
        .select('id', 'quantity', 'volume', 'expire')
        .from('water')
        .where('user_id', user.id)

      return waterContainers
    },
  },
  Mutation: {
    addWater: async (_, { input }, { auth, db }) => {
      const user = await db
        .select('id')
        .from('users')
        .where('email', auth.email)
        .first()

      await db('water').insert({
        expire: input.expire,
        quantity: input.quantity,
        volume: input.volume,
        user_id: user.id,
      })

      return true
    },
    deleteWater: async (_, { input }, { auth, db }) => {
      const user = await db
        .select('id')
        .from('users')
        .where('email', auth.email)
        .first()

      await db
        .del()
        .from('water')
        .where({
          id: input.id,
          user_id: user.id,
        })

      return true
    },
  },
}
