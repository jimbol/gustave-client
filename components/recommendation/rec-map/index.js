'use strict';

import React, {Component, View, Image, MapView, InteractionManager, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles';
import Theme from '../../../themes/default';

const DEFAULT_DELTA = 0.01;
const DELTA_COEF = 2.5;
const GEO_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000
};
const MAP_CONFIG = {
  showsUserLocation: true,
  followUserLocation: false,
  scrollEnabled: false,
  rotateEnabled: false,
  pitchEnabled: false,
};

export default class RecMap extends Component {
  watchID = null;
  state = { position: null, };

  // Lifecycle
  componentDidMount() {
    InteractionManager.setDeadline(2000);
    InteractionManager.runAfterInteractions(this.getCurrentPosition.bind(this));
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getCurrentPosition(){
    let onGetPosition = this.onGetPosition.bind(this);

    navigator.geolocation
      .getCurrentPosition(onGetPosition, this.onGeoError, GEO_OPTIONS);

    this.watchID = navigator.geolocation.watchPosition(onGetPosition);
  }

  onGeoError(){}

  onGetPosition(position){
    this.setState({
      position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  }

  // Rendering
  renderMapView(){
    let region = this.getMapRegion(this.state.position);
    let annotations = this.getMapAnnotations();

    return <MapView
      style={styles.map}
      region={region}
      annotations={annotations}
      {...MAP_CONFIG} />
  }

  getMapAnnotations(){
    return [{
      latitude: this.props.lat,
      longitude: this.props.lng,
    }]
  }

  getMapRegion(position){
    if (!position) return this.getDefaultRegion();

    let placeLat = this.props.lat;
    let placeLng = this.props.lng;

    let latitude = (placeLat + position.lat) / 2;
    let longitude = (placeLng + position.lng) / 2;

    let latitudeDelta = Math.abs(placeLat - position.lat) * DELTA_COEF;
    let longitudeDelta = Math.abs(placeLng - position.lng) * DELTA_COEF;

    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    }
  }

  getDefaultRegion(){
    return {
      latitude: this.props.lat,
      longitude: this.props.lng,
      latitudeDelta: DEFAULT_DELTA,
      longitudeDelta: DEFAULT_DELTA,
    }
  }

  renderPlaceholder(){
    return (
      <View style={styles.placeholderContainer}>
        <Image
          style={styles.placeholderImage}
          source={require('../../../assets/defaultMapView.png')} />
      </View>
    );
  }

  render() {
    let partial = (this.props.lat && this.props.lng)
      ? this.renderMapView()
      : this.renderPlaceholder()

    return <TouchableOpacity
      onPress={this.onGetDirections.bind(this)}
      activeOpacity={0.6}>

      <View>
        {partial}
        <Icon name={'directions'} style={styles.directionIcon} size={30} />
      </View>

    </TouchableOpacity>
  }

  onGetDirections(){
    let url = `http://maps.apple.com/?daddr=${this.props.address}`;
    Linking.openURL(url);
  }
}
