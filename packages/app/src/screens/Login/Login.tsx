import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
} from 'react-native'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`

export default function Login() {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const [login, { data }] = useMutation(LOGIN)

  if (data) {
    AsyncStorage.setItem('userToken', data.login.token)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateEmail(text)}
          keyboardType="email-address"
          value={email}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updatePassword(text)}
          secureTextEntry
          value={password}
        />
      </View>
      <Button
        onPress={() => {
          login({
            variables: {
              input: {
                email,
                password,
              },
            },
          })
        }}
        title="LOGIN"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    alignItems: 'stretch',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  container: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
})
