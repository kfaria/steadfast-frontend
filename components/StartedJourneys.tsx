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
import * as theme from '../assets/theme.ts' 


type props = {
  prayers: Array<object>
}

type state = {
  activeSections: Array<object>,
  collapsed: boolean
}

const { width, height } = Dimensions.get('window');

const PRAYER_JOURNEYS_BY_ID = gql`
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
    }, 
    devotions{
        id
        name
        type
        thumbnailImg
      }
    }
  `

export default function StartedJouryners() {
  const { data, loading, error } = useQuery(PRAYER_JOURNEYS_BY_ID, { variables: { id: 7 } })
  

  const renderJourneys = () => {
    return (
      <View style={[styles.flex, styles.column, styles.recommended]}>
        <View
          style={[
            styles.row,
            styles.recommendedHeader
          ]}
        >
          <Text style={{ fontSize: theme.default.sizes.font * 1.4 }}>Started Journey</Text>
        </View>
        <View style={[styles.column, styles.recommendedList]}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={[styles.shadow, { overflow: 'visible' }]}
            data={data.userById.prayerJourneys}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item, index }) => renderJourneyDevotionCard(item, index, data.userById.prayerJourneys.length)}
          />
        </View>
      </View>
    )
  }

  const renderJourneyDevotionCard = (item, index, length) => {
    const isLastItem = index === length  - 1;
    return (
      <View style={[
        styles.flex, styles.column, styles.recommendation, styles.shadow, 
        index === 0 ? { marginLeft: theme.default.sizes.margin } : null,
        isLastItem ? { marginRight: theme.default.sizes.margin / 2 } : null,
      ]}>
        <View style={[styles.flex, styles.recommendationHeader]}>
          <Image style={[styles.recommendationImage]} source={{ uri: item.devotion.thumbnailImg }} />
        </View>
        <View style={[styles.flex, styles.column, styles.shadow, { justifyContent: 'space-evenly', padding: theme.default.sizes.padding / 2 }]}>
          <Text style={{ fontSize: theme.default.sizes.font * 1.25, fontWeight: '500', paddingBottom: theme.default.sizes.padding / 4.5, }}>{item.devotion.name}</Text>
          <Text style={{ color: theme.default.colors.caption }}>Placeholder</Text>
        </View>
      </View>
    )
  }

  if (loading) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <View>
      {renderJourneys()}
    </View>
  )
}
const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },column: {
    flexDirection: 'column'
  },
  recommended: {
  },
  recommendedHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: theme.default.sizes.padding,
  },
  recommendedList: {
  },
  recommendation: {
    width: (width - (theme.default.sizes.padding * 2)) / 2,
    marginHorizontal: 8,
    backgroundColor: theme.default.colors.white,
    overflow: 'hidden',
    borderRadius: theme.default.sizes.radius,
    marginVertical: theme.default.sizes.margin * 0.5,
  },
  recommendationHeader: {
    overflow: 'hidden',
    borderTopRightRadius: theme.default.sizes.radius,
    borderTopLeftRadius: theme.default.sizes.radius,
  },
  recommendationOptions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.default.sizes.padding / 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: theme.default.sizes.font * 1.25,
    color: theme.default.colors.white
  },
  recommendationImage: {
    width: (width - (theme.default.sizes.padding * 2)) / 2,
    height: (width - (theme.default.sizes.padding * 2)) / 2,
  },
  row: {
    flexDirection: 'row'
  },
  shadow: {
    shadowColor: theme.default.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
})