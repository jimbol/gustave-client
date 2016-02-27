'use strict';

import React, {Component, View, Text, Image} from 'react-native';
import styles from './styles';
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Chip from '../chip';
import Button from '../button';

export default class Recommendation extends Component {

  render() {

    let rec = this.props.recommendation;
    let event = rec.event;
    let place = rec.place;
    let labels = _.union(event.labels, place.labels);

    return (
      <View style={styles.container}>

        <Image
          style={styles.backgroundImage}
          source={{uri: place.photo.uri}}>

          <View style={styles.fader} />

          <Icon name="info-outline" size={30} style={styles.info} onPress={()=> console.log('pressed')} />

          <Text numberOfLines={2} style={styles.eventName}>
            {event.name}
          </Text>
          <Text numberOfLines={2} style={styles.location}>
            @ {place.name}
          </Text>
        </Image>

        <View style={styles.description}>
          <Text numberOfLines={3} style={styles.preview}>
            {event.description}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.chipContainer}>
          {labels.map(tag =>
            <Chip
              key={tag}
              chipStyle={styles.chip}
              chipTextStyle={styles.chipText}
              chipIcon={'\u2605'}>
              {tag}
            </Chip>)
          }
        </View>

      </View>
    );
  }
}
