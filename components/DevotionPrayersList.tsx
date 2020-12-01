import React, { Component } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

type props = {
  prayers: Array<object>
}

type state = {
  activeSections: Array<object>,
  collapsed: boolean
}

export default class DevotionPrayerList extends Component <props, state> {
  state: state = {
    activeSections: [],
    collapsed: true
  };
  
  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };
  
  renderHeader = (section: { day: React.ReactNode; }, _: any, isActive: boolean) => {

    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>Day {section.day}</Text>
      </Animatable.View>
    );
  };

  renderContent(section: { content: React.ReactNode; }, _: any, isActive: boolean) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text duration={200}  animation={isActive ? 'bounce' : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Accordion
            activeSections={this.state.activeSections}
            sections={this.props.prayers}
            touchableComponent={TouchableOpacity}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={100}
            onChange={this.setSections}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 5,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
})