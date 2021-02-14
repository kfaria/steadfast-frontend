import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import {
  gql,
  useQuery,
  useApolloClient,
  useLazyQuery
} from '@apollo/client';
import { Text, View } from './Themed';
import * as theme from '../assets/theme' 


const PRAYER_INTENTIONS_BY_ID = gql`
  {
      userById (
          input :{
            id: 7
          }
        ) {
          prayerJourneys {
            id
            devotion {
              type
              thumbnailImg
              name
            }
            progress
            isPaused
          }
    }
    }
`

export default function PrayerIntentionList() {

  const { data, loading, error } = useQuery(PRAYER_INTENTIONS_BY_ID, { variables: { id: 7 } })


  const renderList = () => {

    return (
      <View></View>
    )
  }

  if (loading) {
    return (
      <Text>Loading...</Text>
    )
  }

  if (error) {
    return (
      <Text>There was an error retreiving your prayer intentions</Text>
    )
  }

  return (
    <View>
      {renderList()}
    </View>
  )
}