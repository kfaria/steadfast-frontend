import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import PrayerJourney from '../components/PrayerJourney';
import { Text, View } from '../components/Themed';

export default function TabOneScreen({navigation}) {
  return (
    <View style={styles.container}>
      <PrayerJourney path="/screens/TabOneScreen.js" navigation={navigation}/>
    </View>
  );
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
