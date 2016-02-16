'use strict';
import React, {
  AppRegistry,
  Animated,
  Component,
  PanResponder,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import _ from 'lodash';

import Dimensions from 'Dimensions';
import styles from './styles.js';
import Button from './components/button';
import Chip from './components/chip';
import Card from './components/card';
import FlipCard from './components/flip-card';

import {data} from './data/mock.json';



class Gustave extends Component {

  // Eventually this will be handled by Relay 
  static defaultProps = {
    recs: data
  }

  // To switch the current recommendation being viewed
  // just use setState({recIndex: <index>})
  state = {
    recIndex: 0
  }

  // This is just test functionality
  nextRec() {
    if (this.state.recIndex < this.props.recs.length - 1) {
      this.setState({recIndex: this.state.recIndex + 1});
    } else {
      this.setState({recIndex: 0});
    }
  }

  // Main render method
  render() {
    
    return (
      <View style={styles.container}>
        <FlipCard rec={this.props.recs[this.state.recIndex]} />
        <TouchableHighlight onPress={this.nextRec.bind(this)}>
          <Button>I'M DOWN</Button>
        </TouchableHighlight>
      </View>
    );
            // <Text style={styles.button}>
            //   I'M DOWN
            // </Text>
  }
}

AppRegistry.registerComponent('gustave', () => Gustave);
