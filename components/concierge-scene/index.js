'use strict';

import React, {Component, View, Text, MapView} from 'react-native';
import styles from './styles';
import Button from '../button';
import Card from '../card';

export default class ConciergeScene extends Component {

  navBack() {
    this.props.onBack(this.props.navigator);
  }

  render() {
    let event = this.props.rec.event;
    let place = event.place;

    return (
      <View style={[this.props.style, styles.scene]}>
        <Button buttonStyle={styles.backButton} onPress={this.navBack.bind(this)}>
          Go Back
        </Button>
        <Text>This scene has access to the current event object and all data...</Text>
        <Text>{event.name + ' ' + place.address}</Text>
        <Text>We'll have to teach Gustave to do cool things!</Text>
        <Text>Maybe he could display a map with our current position and the location, with a button to launch the maps application.</Text>
        <Text>Maybe he could check reservations with OpenTable.</Text>
        <Text>Maybe he could look for Groupons/1st-party coupons.</Text>
        <Text>Maybe he could find tickets for sale for the event.</Text>
        <Text>Maybe he could call you an Uber.</Text> 
        <Text>Dickbutt.</Text>             
      </View>
    );
  }
}
