'use strict';

import React, {Component, View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import moment from 'moment';
import styles from './styles';


export default class FavoritesScene extends Component {

  static propTypes = {
    favorites: React.PropTypes.array,
  };

  _getFavorite(recommendation) {
    let event = recommendation.event;
    let place = event.place;
    let start = moment(event.time.start).format('ddd MM/DD @ h:mm A');
    let end  = moment(event.time.end).format('ddd MM/DD @ h:mm A');

    return (
      <TouchableOpacity 
        onPress={() => this.props.viewDetail(recommendation)} 
        key={recommendation.id}>
        <View style={styles.recommendation}>
          <View style={styles.recommendationTextContainer}>
            <Text numberOfLines={1} style={styles.recommendationTitle}>
              {event.name + ' @ ' + place.name}
            </Text>
            <Text numberOfLines={2} style={styles.recommendationDescription}>
              {event.description}
            </Text>
            <Text style={styles.info}>{start}</Text>
          </View>
          <Image  
            style={styles.recommendationImage}
            source={{uri: place.photo.uri}}/>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView style={[this.props.style, styles.scene]}>
        {this.props.favorites
          .sort((a, b) => moment(b.event.time.start).isBefore(a.event.time.start))
          .map(favorite => this._getFavorite(favorite))}
      </ScrollView>
    );
  }
}
