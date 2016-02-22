'use strict';

import React, {Component, View, Text, Image} from 'react-native';
import styles from './styles';
import _ from 'lodash';
import moment from 'moment';

import Chip from '../chip';
import Button from '../button';

export default class Recommendation extends Component {

  render() {

    let rec = this.props.recommendation;
    let event = rec.event;
    let place = rec.event.place;
    let labels = _.union(event.labels, place.labels);

    return (
      <View style={styles.container}>

        <Image
          style={styles.backgroundImage}
          source={{uri: place.photo.uri}}>
        </Image>

        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {event.name + ' @ ' + place.name}
          </Text>
          <Text numberOfLines={2} style={styles.preview}>
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
