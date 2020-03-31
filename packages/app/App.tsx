import React from 'react'
import { AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import Start from './src/screens/Start/Start'

const httpLink = new HttpLink({
  uri: 'http://192.168.0.5:4000/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
  AsyncStorage.getItem('userToken').then((token) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  })
  return forward(operation)
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Start />
    </ApolloProvider>
  )
}
