import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
  ImageBackground,
  Dimensions,
  Platform,
  Image
} from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as theme from '../assets/theme.ts' 
const { width, height } = Dimensions.get('window');

export default function PrayerJourney({ path }: { path: string }) {
  let scrollX = new Animated.Value(0);
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
              name
            }
            progress
            isPaused
          }
    }, 
    devotions{
        id
        name
      }
    }
  `
  const { data, loading, error } = useQuery(PRAYER_JOURNEYS_BY_ID, { variables: { id: 7 } })

  if (loading) return (
    <View><Text>Loading...!!!!</Text></View>
  );
  if (error) return (
    <View><Text>Error! {error.message}</Text></View>
  )
  
  const renderDevotions = () => {
    return (
      <View>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{ overflow:'visible', height: 280 }}
          data={data.devotions}
          keyExtractor={(item, index) => `${item.id}`}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX }} }])}
          renderItem={({ item }) => renderDevotionCard(item)}
        />
      </View>
    )
  }

  const renderDevotionCard = (item: { name: React.ReactNode; }) => {
    return (
      <TouchableOpacity>
        <ImageBackground
          source={{ uri: 'https://cdn.getyourguide.com/img/location/5474840409adb.jpeg/92.jpg' }}
          style={[styles.flex, styles.destination, styles.shadow]}
          imageStyle={{ borderRadius: theme.default.sizes.radius }}
        >
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={[styles.column, { flex: 2, paddingHorizontal: theme.default.sizes.padding / 2 }]}>
              {/* <Text style={{  fontWeight: 'bold' }}>{item.name}</Text> */}
            </View>
          </View>
        </ImageBackground>
        <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
            <Text style={{ fontSize: theme.default.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8, }}>
              {item.name}
            </Text>
            <View style={[ styles.row, { justifyContent: 'space-between', alignItems: 'flex-end', }]}>
              <Text style={{ color: theme.default.colors.caption }}>
              {/* {item.description.split('').slice(0, 50)}... */}
              This is a description of the prayer devotion you're about to begin !
              </Text>
              <FontAwesome
                name="chevron-right"
                size={theme.default.sizes.font * 0.75}
                color={theme.default.colors.caption}
              />
            </View>
          </View>
      </TouchableOpacity>
    )
  }

  const renderPrayerJourneys = () => {
    return (
      <View style={[styles.flex, styles.column, styles.recommended ]}>
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
            style={[ styles.shadow, { overflow: 'visible' }]}
            data={data.userById.prayerJourneys}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item, index }) => renderPrayerDevotionCard(item, index)}
          />
        </View>
      </View>
    )
  }

  const renderPrayerDevotionCard = (item, index) => {
    const isLastItem = index === data.userById.prayerJourneys.length - 1;
    return (
      <View style={[
        styles.flex, styles.column, styles.recommendation, styles.shadow, 
        index === 0 ? { marginLeft: theme.default.sizes.margin } : null,
        isLastItem ? { marginRight: theme.default.sizes.margin / 2 } : null,
      ]}>
        <View style={[styles.flex, styles.recommendationHeader]}>
          <Image style={[styles.recommendationImage]} source={{ uri: 'https://cdn.getyourguide.com/img/location/5474840409adb.jpeg/92.jpg' }} />
        </View>
        <View style={[styles.flex, styles.column, styles.shadow, { justifyContent: 'space-evenly', padding: theme.default.sizes.padding / 2 }]}>
          <Text style={{ fontSize: theme.default.sizes.font * 1.25, fontWeight: '500', paddingBottom: theme.default.sizes.padding / 4.5, }}>{item.devotion.name}</Text>
          <Text style={{ color: theme.default.colors.caption }}>Placeholder</Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      {renderDevotions()}  
      {renderPrayerJourneys()}  
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  header: {
    backgroundColor: theme.default.colors.white,
    paddingHorizontal: theme.default.sizes.padding,
    paddingTop: theme.default.sizes.padding * 1.33,
    paddingBottom: theme.default.sizes.padding * 0.66,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articles: {
  },
  destinations: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  destination: {
    width: width - (theme.default.sizes.padding * 2),
    height: width * 0.7,
    marginHorizontal: theme.default.sizes.margin,
    paddingHorizontal: theme.default.sizes.padding,
    paddingVertical: theme.default.sizes.padding * 0.66,
    borderRadius: theme.default.sizes.radius,
  },
  destinationInfo: {
    // position: 'absolute',
    borderRadius: theme.default.sizes.radius,
    paddingHorizontal: theme.default.sizes.padding,
    paddingVertical: theme.default.sizes.padding / 2,
    bottom: 20,
    left: (width - (theme.default.sizes.padding * 4)) / (Platform.OS === 'ios' ? 3.2 : 3),
    backgroundColor: theme.default.colors.white,
    width: width - (theme.default.sizes.padding * 4),
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
  avatar: {
    width: theme.default.sizes.padding,
    height: theme.default.sizes.padding,
    borderRadius: theme.default.sizes.padding / 2,
  },
  rating: {
    fontSize: theme.default.sizes.font * 2,
    color: theme.default.colors.white,
    fontWeight: 'bold'
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
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: theme.default.colors.gray,
    borderColor: 'transparent',
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: theme.default.colors.active,
  }
});
