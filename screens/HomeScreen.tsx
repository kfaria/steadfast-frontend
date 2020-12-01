import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gql, useQuery, useApolloClient, useLazyQuery } from '@apollo/client';
import * as theme from '../assets/theme.ts';
// import { View } from 'react-native-animatable';
// import { Text } from '../components/Themed';

import StartedJourneys from '../components/StartedJourneys';


export default function HomeScreen({ route, navigation }: { route: any, navigation: any }) {

  return (
    <View style={styles.container}>
      {/* <View>
        <Text style={styles.title}>This is the home page!</Text>
      </View> */}
      
      <Text style={styles.box1}> </Text>
      <Text style={styles.box2}> </Text>
      <View style={styles.journeyContainer}>
        <StartedJourneys></StartedJourneys>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    paddingTop: '20%',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'powderblue'
  },
  journeyContainer: {
    flex: 3,
  },
  box1: {
    flex: 3,
    backgroundColor: 'steelblue'
  },
  box2: {
    flex: 3,
    backgroundColor: 'powderblue'
  }
});