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
  Image,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import { Text, View } from '../components/Themed';
import DevotionPrayersList from '../components/DevotionPrayersList'
import { gql, useQuery, useApolloClient, useLazyQuery } from '@apollo/client';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as theme from '../assets/theme.ts' 
const { width, height } = Dimensions.get('window');

export default function PrayerJourneyModalScreen({ route, navigation }: { route: any, navigation: any }) { 
  const { devotion } = route.params;
  let scrollX = new Animated.Value(0);

  const DEVOTION_PRAYERS_BY_DEVOTION_ID = gql`
    query devotionPrayers ($devotionId: Int!) {
      devotionPrayersByDevotionId  (
          input :{
            devotionId: $devotionId
          }
        ) {
    			id
          content
    			day
        }
    }
  `

  const { data, loading, error } = useQuery(DEVOTION_PRAYERS_BY_DEVOTION_ID, { variables: { devotionId: devotion.id } })

  // console.log(data.devotionPrayersByDevotionId[0])

  return (
      <View style={styles.flex}>
        <View style={[styles.flex]}>
          <ScrollView
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }])}
          >
            {
              // devotion.thumbnailImg.map((img, index) => 
                <Image
                  // key={`${index}-${img}`}
                  source={{ uri: devotion.thumbnailImg }}
                  resizeMode='cover'
                  style={{ width, height: width }}
                />
              // )
            }
        </ScrollView>
          {/* {this.renderDots()} */}
        </View>
        <View style={[styles.flex, styles.content]}>
          <View style={[styles.flex, styles.contentHeader]}>
            <Image style={[styles.avatar, styles.shadow]} source={{ uri: devotion.thumbnailImg }} />
            <Text style={styles.title}>{devotion.name}</Text>
            <View style={[
              styles.row,
              { alignItems: 'center', marginVertical: theme.default.sizes.margin / 2 }
            ]}>
              {/* {this.renderRatings(article.rating)} */}
              <Text style={{ color: theme.default.colors.active }}>
                {devotion.type} 
              </Text>
            </View>
            <TouchableOpacity>
            <Text style={styles.description}>
              {/* {article.description.split('').slice(0, 180)}... */}
              {/* <Text style={{color: theme.default.colors.active}}> Read more</Text> */}
              <DevotionPrayersList prayers={data.devotionPrayersByDevotionId}/>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    backgroundColor: 'transparent',
    paddingHorizontal: theme.default.sizes.padding,
    paddingTop: theme.default.sizes.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  back: {
    width: theme.default.sizes.base * 3,
    height: theme.default.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    // backgroundColor: theme.colors.active,
    // borderTopLeftRadius: theme.sizes.border,
    // borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    // backgroundColor: 'transparent',
    padding: theme.default.sizes.padding,
    backgroundColor: theme.default.colors.white,
    borderTopLeftRadius: theme.default.sizes.radius,
    borderTopRightRadius: theme.default.sizes.radius,
    marginTop: -theme.default.sizes.padding / 2,
  },
  avatar: {
    position: 'absolute',
    top: -theme.default.sizes.margin,
    right: theme.default.sizes.margin,
    width: theme.default.sizes.padding * 2,
    height: theme.default.sizes.padding * 2,
    borderRadius: theme.default.sizes.padding,
  },
  shadow: {
    shadowColor: theme.default.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 36,
    right: 0,
    left: 0
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: theme.default.colors.gray,
  },
  title: {
    fontSize: theme.default.sizes.font * 2,
    fontWeight: 'bold'
  },
  description: {
    fontSize: theme.default.sizes.font * 1.2,
    lineHeight: theme.default.sizes.font * 2,
    color: theme.default.colors.caption
  }
});