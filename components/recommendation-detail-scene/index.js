'use strict';

import React, {Component, View, Text, Image} from 'react-native';
import styles from './styles';
import moment from 'moment';

import Card from '../card';
import Chip from '../chip';
import Button from '../button';


export default class RecommendationDetail extends Component {
  render() {

    let rec = this.props.recommendation;
    let event = rec.event;
    let place = rec.event.place;
    let start = moment(event.time.start).format('ddd MM/DD @ h:mm A');
    let end  = moment(event.time.end).format('ddd MM/DD @ h:mm A');

    return (
      <View style={[this.props.style, styles.scene]}>
        <Card>
          <Image style={styles.backgroundImage}
            source={{uri: event.place.photo.uri}}>
          </Image>

          <View style={styles.divider} />

          <View style={styles.event}>
            <Text style={styles.subtitle}>{event.name}</Text>
            <Text style={styles.info}>{start + ' - ' + end}</Text>
            <Text numberOfLines={5}>{event.description}</Text>
            <View style={styles.chipContainer}>
              {event.labels.map(tag =>
                <Chip
                  key={tag}
                  chipStyle={styles.chip}
                  chipTextStyle={styles.chipText}
                  chipIconTextStyle={styles.chipIconText}
                  chipIcon={'\u2605'} >
                  {tag}
                </Chip>
              )}
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.place}>
            <Text style={styles.subtitle}>{event.place.name}</Text>
            <Text style={styles.info}>{event.place.address}</Text>
            <Text style={styles.info}>{'Open today ' + event.place.hours}</Text>
            <Text numberOfLines={5}>{event.place.description}</Text>
            <View style={styles.chipContainer}>
              {event.place.labels.map(tag =>
                <Chip key={tag}
                  chipStyle={styles.chip}
                  chipTextStyle={styles.chipText} >
                  {tag}
                </Chip>
              )}
            </View>
          </View>

        </Card>
      </View>
    );
  }
}
