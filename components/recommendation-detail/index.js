'use strict';

import React, {Component, View, Text, Image} from 'react-native';
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
        <Image
          style={styles.backgroundImage}
          source={{uri: this.props.rec.event.place.photo.uri}}>

          <Button onPress={this.props.onToggleDetail}>
            Back
          </Button>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {this.props.rec.event.name + ' @ \n' + this.props.rec.event.place.name}
            </Text>
          </View>

        </Image>


        <View style={styles.divider} />

        <View style={styles.detail}>
          <Text style={styles.subtitle}>{event.name}</Text>
          <Text>{event.description}</Text>
           <View style={styles.chipContainer}>
            {event.labels.map(tag => <Chip key={tag} chipStyle={styles.chip} chipTextStyle={styles.chipText} chipIcon={'\u2605'}>{tag}</Chip>)}
          </View>
        </View>




        <View style={styles.divider} />

        <View style={styles.detail}>
          <Text style={styles.subtitle}>{event.place.name}</Text>
          <Text>{event.place.description}</Text>
          <View style={styles.chipContainer}>
            {event.place.labels.map(tag => <Chip key={tag} chipStyle={styles.chip} chipTextStyle={styles.chipText}>{tag}</Chip>)}
          </View>
        </View>

      </Card>
    );
  }
}
