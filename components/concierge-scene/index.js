'use strict';

import React, {Component, View, Text, Image, MapView} from 'react-native';
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

        <Image style={styles.backgroundImage} source={{uri: event.place.photo.uri}}>

          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {event.name + ' @ ' + place.name}
            </Text>
          </View>

        </Image>



        <MapView 
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={false}
          region={region}
          annotations={annotations}
          />

        {/* The onPress is only used to have a way back until the top menu is in. Then we'll have this button actually open an external maps app and get directions. */}
        <Button onPress={() => this.props.onBack(this.props.navigator)}>Get Directions</Button>

        <View style={styles.other}>
          <Text style={styles.otherExample}>Gustave will eventually do lots of other useful things through proprietary and 3rd-party technology & partnerships.</Text>
            <Text style={styles.otherExample}>+ Summon a ride</Text>
            <Text style={styles.otherExample}>+ Book a reservation</Text>
            <Text style={styles.otherExample}>+ Reserve tickets</Text>
            <Text style={styles.otherExample}>+ Find available discounts</Text> 
            <Text style={styles.otherExample}>+ And more!</Text> 
        </View> 

      </View>
    );
  }
}
