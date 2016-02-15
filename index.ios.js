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

  // Renders topic tags by collapsing event and place labels into a unique union
  renderTags() {
    let rec = this.props.recs[this.state.recIndex];
    return _.union(rec.event.labels, rec.event.place.labels).map(tag =>
      <Chip key={tag}>{tag}</Chip>
    );
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

    // This is how we control the current 
    let rec = this.props.recs[this.state.recIndex];
    
    return (
      <View style={styles.container}>
        <Card>
          <Image
            style={styles.backgroundImage}
            source={{uri: rec.event.place.photo.uri}}
          />

          <Text style={styles.title}>
            {rec.event.name} @ {rec.event.place.name}
          </Text>

          <View style={styles.divider} />

          <View style={styles.chipContainer}>
            {this.renderTags()}
          </View>

          <TouchableHighlight onPress={this.nextRec.bind(this)}>
            <Button>I'M DOWN</Button>
          </TouchableHighlight>

        </Card>
      </View>
    );
            // <Text style={styles.button}>
            //   I'M DOWN
            // </Text>
  }
}

AppRegistry.registerComponent('gustave', () => Gustave);
