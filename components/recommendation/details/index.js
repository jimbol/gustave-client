'use strict';

import React, {Component, View, Text} from 'react-native';
import styles from './styles';
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons'

import ChipList from '../chip-list';

export default class Details extends Component {

  createRow(icon, content) {
    return (
      <View style={styles.row}>
        <Icon name={icon} size={18} style={styles.descIcon} />
        <Text style={styles.rowContent}>
          {content}
        </Text>
      </View>
    )
  }

  render() {
    let event = this.props.event;
    let place = this.props.place;

    let start = moment(event.time.start).format('h:mm A');
    let end  = moment(event.time.end).format('h:mm A');

    // Create rows
    let timeRow = this.createRow('access-time', `Today, ${start} - ${end}`);

    let locationRow = this.createRow('location-on',
      `${place.name}\n${place.location.street}\n${place.location.city}, ${place.location.state} ${place.location.zipCode}`
    );

    let hoursRow = this.createRow('date-range', `Open ${place.hours}`);

    return (
      <View style={styles.container}>
        {locationRow}
        {timeRow}
        <ChipList labels={event.labels} />
        <View style={styles.divider} />
        {hoursRow}
        <ChipList labels={place.labels} />
      </View>
    )
  }
}
