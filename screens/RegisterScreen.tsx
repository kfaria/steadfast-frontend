import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { gql, useMutation, useQuery } from '@apollo/client';



export default function RegisterScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'Register'>) {

  const [firstName, setFirstName] = React.useState('Enter your first name')
  const [lastName, setLastName] = React.useState('Enter your last name')
  const [email, setEmail] = React.useState('Enter your email')
  const [password, setPassword] = React.useState('Enter your password')

  const REGISTER_USER = gql`
    mutation RegisterUser ($email:String!, $lastName:String!, $firstName:String!, $passphrase:String!) {
      registerUser(
        input:
        {
          email: $email
          lastName: $lastName
          firstName: $firstName
          passphrase: $passphrase
        } 
      ) {
        token
        user{
          id
        }
      }
    }
  `;
  const [registerUser, { data: mutationData, loading: mutationLoading }] = useMutation(REGISTER_USER)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Register!</Text>
      <form
        onSubmit={async e => {
          e.preventDefault();
          console.log({email, lastName, firstName, password})
          registerUser({
            variables: {
              email: email,
              lastName: lastName,
              firstName: firstName,
              passphrase: password
            }
          })
          console.log()
        }}
      >
        <Text style={styles.title}>First Name</Text>
        <TextInput
          style={styles.inputBox}
          value={firstName}
          onChangeText={firstName => setFirstName(firstName)}></TextInput>
        <Text style={styles.title}>Last Name</Text>
        <TextInput
          style={styles.inputBox}
          value={lastName}
          onChangeText={lastName => setLastName(lastName)}>
          </TextInput>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={email => setEmail(email)}>
          </TextInput>
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={password => setPassword(password)}>
          </TextInput>
        <button title='Register' type='submit'>Register</button>
      </form>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})