'use strict';

import React, {Component, View, Text} from 'react-native';
import styles from './styles';
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Stagger from '../../stagger';
import RecMap from '../rec-map';
import ChipList from '../chip-list';

class Row extends Component {
  render(){
    let iconView;
    let icon = this.props.icon;
    if (icon) iconView = <Icon name={icon} size={18} style={styles.descIcon} />

    return (
      <View style={styles.row}>
        {iconView}
        <View style={styles.rowContent}>
          {this.props.children}
        </View>
      </View>
    );
  }
};

export default class Details extends Component {
  render() {
    let event = this.props.event;
    let place = this.props.place;
    let address = `${place.location.street}\n${place.location.city}, ${place.location.state} ${place.location.zipCode}`

    let start = moment(event.time.start).format('h:mm A');
    let end  = moment(event.time.end).format('h:mm A');

    let components = [
      <Row>
        <Text style={styles.description}>{event.description}</Text>
      </Row>,
      <Row>
        <ChipList labels={event.labels} />
      </Row>,
      <Row icon={'access-time'}>
        <Text>Today, {start} - {end}</Text>
      </Row>,
      <Row icon={'location-on'}>
        <Text>{address}</Text>
      </Row>,
      <Row>
        <RecMap
          showUserPosition={true}
          address={address}
          lat={place.geo.lat}
          lng={place.geo.lng} />
      </Row>,
      <Row>
        <Text style={styles.description}>{place.description}</Text>
      </Row>,
      <Row>
        <ChipList labels={place.labels} />
      </Row>,
      <Row icon={'date-range'}>
        <Text>Open {place.hours}</Text>
      </Row>,
    ];

    return (
      <View style={styles.container}>
        <Stagger components={components} />
      </View>
    )
  }
}
