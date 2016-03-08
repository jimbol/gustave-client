'use strict';

import React, {Component, View, Text} from 'react-native';
import styles from './styles';
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons'

import ChipList from '../chip-list';

export default class Teaser extends Component {

  render() {
    let event = this.props.event;
    let place = this.props.place;

    let start = moment(event.time.start).format('h:mm A');

    let labels = _.union(event.labels, place.labels);

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16, marginTop: -8}}>
          <Text style={{flex: 1, opacity: 0.65, margin: 5, textAlign: 'left'}}>Happening 0.25 miles away</Text>
          <Icon name="local-taxi" size={20} style={{margin: 5, opacity: 0.75}} />
          <Icon name="local-offer" size={20} style={{margin: 5, opacity: 0.75}} />
          <Icon name="local-movies" size={20} style={{margin: 5, opacity: 0.75}} />
          <Icon name="local-dining" size={20} style={{margin: 5, opacity: 0.75}} />
        </View>
        <ChipList labels={labels} />
      </View>
    )
  }
}
