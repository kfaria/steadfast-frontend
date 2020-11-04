import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { gql, useMutation, useQuery, InMemoryCache } from '@apollo/client';

export default function LoginScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) { 


  const LOGIN = gql`
    mutation Login ($email:String!, $passphrase:String!) {
      loginUser(
        input:
        {
          email: $email
          passphrase: $passphrase
        }
      ) {
        token
        user {
          id
          email
          firstName
          lastName
          prayerRequests {
            id
            intention
          }
          prayerJourneys{
            id
            progress
            isPaused
            devotion{
              name
            }
          }
        }
      }
    }
  `;
  
  const [login, { loading: mutationLoading }] = useMutation(LOGIN)
  const [email, setEmail] = React.useState('Kenneth')
  const [passphrase, setPassphrase] = React.useState('pray')
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Steadfast!</Text>
      <form onSubmit={async e => {
        e.preventDefault();
        try {
          const result = await login({
                      variables: {
                        email,
                        passphrase
                      }
          })
          navigation.navigate('Root')
          console.log(result)
        } catch {
          console.log("gg")
        }
          
      }}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={email => setEmail(email)}>
          </TextInput>
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.inputBox}
          value={passphrase}
          onChangeText={passphrase => setPassphrase(passphrase)}>
        </TextInput>
        <button title='Login' type='submit'>Login</button>  
      </form>
        {mutationLoading && <p>Loading...</p>}
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