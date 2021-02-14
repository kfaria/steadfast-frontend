 import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import {  View } from '../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { gql, useMutation, useQuery, InMemoryCache } from '@apollo/client';
import { Card, Text, } from '@ui-kitten/components';

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
          }
        }
      }
  `;
  
  const [login, { loading: mutationLoading }] = useMutation(LOGIN)
  const [email, setEmail] = React.useState('Kenneth')
  const [passphrase, setPassphrase] = React.useState('pray')
  

  async function loginUser (e: { preventDefault: () => void; }){
    e.preventDefault();
        try {
          const result =  login({
            variables: {
              email,
              passphrase
            }
          })
          navigation.navigate('Root')
        } catch {
          console.log("Error occured in login")
        }
  }
  return (
    <View style={styles.container}>
      <Card>
      <Text style={styles.title}>Welcome to Steadfast!</Text>
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
        <Button title='Login' onPress={loginUser}><Text>Login!</Text></Button>  
        {mutationLoading && <Text>Loading...</Text>}
      </Card>

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