'use strict';

import React, {Component, View, Text, Image} from 'react-native';
import styles from './styles';
import moment from 'moment';

import Card from '../card';
import Chip from '../chip';
import Button from '../button';


export default class RecommendationDetail extends Component {
  render() {

    let place = this.props.rec.event.place;
    let event = this.props.rec.event;
    let start = moment(event.time.start).format('ddd MM/DD @ h:mm A');
    let end  = moment(event.time.end).format('ddd MM/DD @ h:mm A');


    return (
      <Card>
        <Image
          style={styles.backgroundImage}
          source={{uri: this.props.rec.event.place.photo.uri}}>

          <Button onPress={this.props.onToggleDetail}>
            Back
          </Button>

          <View style={styles.titleContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {this.props.rec.event.name + ' @ ' + this.props.rec.event.place.name}
            </Text>
          </View>

        </Image>


        <View style={styles.divider} />

        <View style={styles.event}>
          <Text style={styles.subtitle}>{event.name}</Text>
          <Text style={styles.info}>{start + ' - ' + end}</Text>
          <Text numberOfLines={5}>{event.description}</Text>
           <View style={styles.chipContainer}>
            {event.labels.map(tag => <Chip key={tag} chipStyle={styles.chip} chipTextStyle={styles.chipText} chipIconTextStyle={styles.chipIconText} chipIcon={'\u2605'}>{tag}</Chip>)}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.place}>
          <Text style={styles.subtitle}>{event.place.name}</Text>
          <Text style={styles.info}>{event.place.address}</Text>
          <Text style={styles.info}>{'Open today ' + event.place.hours}</Text>
          <Text numberOfLines={5}>{event.place.description}</Text>
          <View style={styles.chipContainer}>
            {event.place.labels.map(tag => <Chip key={tag} chipStyle={styles.chip} chipTextStyle={styles.chipText}>{tag}</Chip>)}
          </View>
        </View>

      </Card>
    );
  }
}
