import express from 'express'
import { ApolloServer, gql, IResolvers } from 'apollo-server-express'
import {
  typeDefs as userDefs,
  resolvers as userResolvers,
} from './resolvers/user'
import {
  typeDefs as authDefs,
  resolvers as authResolvers,
} from './resolvers/auth'
import {
  typeDefs as pantryDefs,
  resolvers as pantryResolvers,
} from './resolvers/pantry'
import {
  typeDefs as waterDefs,
  resolvers as waterResolvers,
} from './resolvers/water'
import merge from 'lodash.merge'
import http from 'http'
import { db } from './adapters/postgres'
import { PrepperContext } from './types'
import { AuthDirective } from 'graphql-directive-auth'
import config from './config'

process.env.APP_SECRET = config.auth.secret

const typeDefs = gql`
  directive @isAuthenticated on FIELD | FIELD_DEFINITION

  """
  An ISO-8601 encoded UTC date string.
  """
  scalar DateTime

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`

const server = new ApolloServer({
  typeDefs: [typeDefs, userDefs, authDefs, pantryDefs, waterDefs],
  resolvers: merge(
    userResolvers,
    authResolvers,
    pantryResolvers,
    waterResolvers
  ) as IResolvers<any, PrepperContext>,
  schemaDirectives: {
    // to use @hasRole and @isAuthenticated directives
    ...AuthDirective(),
  },
  context: ({ req }) => ({
    db,
    req,
  }),
})

const app = express()

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
