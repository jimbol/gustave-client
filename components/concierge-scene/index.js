'use strict';

import React, {Component, View, Text, Image, MapView} from 'react-native';
import styles from './styles';
import Button from '../button';
import Card from '../card';

export default class ConciergeScene extends Component {

  watchID = null;
  focusSubscription = null;

  state = {
    position: null,
    didFocus: false,
  };

  onFocus() {
    this.setState({didFocus: true});
  }

  geoLocationOptions = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000
  };

  componentDidMount() {
    this.focusSubscription = this.props.navigationContext.addListener('didfocus', this.onFocus.bind(this));

    navigator.geolocation.getCurrentPosition(
      this.onReceiveCurrentPosition.bind(this),
      this.onGeoLocationError.bind(this),
      this.geoLocationOptions
    );

    this.watchID = navigator.geolocation.watchPosition(this.onReceiveCurrentPosition.bind(this));
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    this.focusSubscription.remove();
  }

  onReceiveCurrentPosition(position){
    this.setState({
      position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  }

  onGeoLocationError(error){
    console.error(error.message);
  }

  getMapRegion(position, place){
    let DEFAULT_DELTA = 0.01;
    let DELTA_COEF = 2.5;

    let placeLat = place.geo.lat;
    let placeLng = place.geo.lng;

    let latitude = position ? (placeLat + position.lat) / 2 : placeLat;
    let longitude = position ? (placeLng + position.lng) / 2 : placeLng;

    let latitudeDelta = position ? Math.abs(placeLat - position.lat) * DELTA_COEF : DEFAULT_DELTA;
    let longitudeDelta = position ? Math.abs(placeLng - position.lng) * DELTA_COEF : DEFAULT_DELTA;

    return {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    }
  }

  getMapAnnotations(place){
    return [{
      latitude: place.geo.lat,
      longitude: place.geo.lng,
      title: place.name,
      subtitle: place.address
    },]
  }

  onGetDirections(){
    console.log('noop');
  }

  render() {
    let event = this.props.recommendation.event;
    let place = event.place;
    let region = this.getMapRegion(this.state.position, event.place);
    let annotations = this.getMapAnnotations(event.place);

    return (
      <View style={[this.props.style, styles.scene]}>

        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {event.name + ' @ ' + place.name}
          </Text>
        </View>

        {this.state.didFocus ? 
          <MapView
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={false}
          region={region}
          annotations={annotations} /> 
        :
          <View style={styles.placeholderContainer}>
            <Image 
              style={styles.placeholderImage}
              source={require('../../assets/defaultMapView.png')} />
          </View>
        }

        <Button onPress={this.onGetDirections.bind(this)}>
          Get Directions
        </Button>

        <View style={styles.other}>
          <Text style={styles.otherExample}>
            Gustave will eventually do lots of other useful things through
            proprietary and 3rd-party technology & partnerships.
          </Text>
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
