'use strict';

import React, {Component, View, Text} from 'react-native';
import styles from './styles';

import Card from '../card';
import Chip from '../chip';
import Button from '../button';

export default class RecommendationDetail extends Component {
  render() {

    let place = this.props.rec.event.place;
    let event = this.props.rec.event;

    return (
      <Card>

        <Button style={styles.showMeMore} onPress={this.props.onToggleDetail}>
          Back
        </Button>

        <Text style={styles.title}>
          {event.name} @ {event.place.name}
        </Text>

        <View style={styles.divider} />
        <View>
          <Text>{event.name}</Text>
          <Text>{event.description}</Text>
        </View>
        <View style={styles.chipContainer}>
          {event.labels.map(tag => <Chip key={tag}>{tag}</Chip>)}
        </View>


        <View style={styles.divider} />
        <View>
          <Text>{event.place.name}</Text>
          <Text>{event.place.description}</Text>
        </View>
        <View style={styles.chipContainer}>
          {event.place.labels.map(tag => <Chip key={tag}>{tag}</Chip>)}
        </View>

      </Card>
    );
  }
}
