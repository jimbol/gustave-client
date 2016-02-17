'use strict';

import React, {Component, View, Text, MapView} from 'react-native';
import styles from './styles';
import Button from '../button';
import Card from '../card';

export default class ConciergeScene extends Component {

  watchID = null;
  state = {
    position: null,
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position: {lat: position.coords.latitude, lng: position.coords.longitude}});
      },
      (error) => console.error(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({position: {lat: position.coords.latitude, lng: position.coords.longitude}});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  navBack() {
    this.props.onBack(this.props.navigator);
  }

  render() {
    let event = this.props.rec.event;
    let place = event.place;

    let position = this.state.position;
    let region = {latitude: position ? (place.geo.lat + position.lat)/2 : place.geo.lat,
                  longitude: position ? (place.geo.lng + position.lng)/2 : place.geo.lng,
                  latitudeDelta: position ? Math.abs(place.geo.lat - position.lat) * 2.5 : 0.01,
                  longitudeDelta: position ? Math.abs(place.geo.lng - position.lng) * 2.5 : 0.01,};
    let annotations = [{latitude: place.geo.lat, 
                        longitude: place.geo.lng, 
                        title: place.name,
                        subtitle: place.address},]

    return (
      <View style={[this.props.style, styles.scene]}>
        <Button buttonStyle={styles.backButton} onPress={this.navBack.bind(this)}>
          Go Back
        </Button>
        <MapView 
          style={styles.map}
          showsUserLocation={true}
          region={region}
          annotations={annotations}
          />

        <View style={styles.other}>
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
      </View>
    );
  }
}
