'use strict';

import React, {Component, Dimensions, View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import moment from 'moment';
import styles from './styles';

import Swipeable from '../swipeable';
import Card from '../card';

import Icon from 'react-native-vector-icons/MaterialIcons';

const CARD_CLICK_ACTIVE_OPACITY = 0.7

export default class SavedRecommendationsScene extends Component {

  static propTypes = {
    savedRecommendations: React.PropTypes.arrayOf(React.PropTypes.object),
    removeSavedRecommendation: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    savedRecommendations: [],
  };

  removeRecommendation(recommendation) {
    this.props.removeSavedRecommendation(recommendation.id);
  }

  _renderSavedRec(recommendation) {
    let event = recommendation.event;
    let place = recommendation.place;
    let start = moment(event.time.start).format('ddd MM/DD @ h:mm A');
    let end  = moment(event.time.end).format('ddd MM/DD @ h:mm A');

    let leftSwipeEdge =
      <TouchableOpacity onPress={this.removeRecommendation.bind(this, recommendation)} style={styles.edgeContainer}>
        <Icon name="not-interested" style={styles.edgeLabel} />
      </TouchableOpacity>;

    let swipeableProps = {
      onSwipeLeft: this.removeRecommendation.bind(this, recommendation),
      leftSwipeEdge,
      pinThresholdLeft: 0.3,
      pinOffsetLeft: 100,
    };

    return (
      <Swipeable {...swipeableProps} key={recommendation.id}>
        <Card cardStyle={styles.card}>
          <TouchableOpacity 
            activeOpacity={CARD_CLICK_ACTIVE_OPACITY} 
            onPress={this.props.viewRecommendation.bind(null, recommendation.id)}>
            <View style={styles.recommendationContainer}>
              <Image
                style={styles.recommendationImage}
                source={{uri: place.photo.uri}}/>
              <View style={styles.recommendationTextContainer}>
                <View style={styles.recommendationText}>
                  <Text numberOfLines={1} style={styles.recommendationTitle}>
                    {event.name + ' @ ' + place.name}
                  </Text>
                  <Text numberOfLines={2} style={styles.recommendationDescription}>
                    {event.description}
                  </Text>
                  <Text style={styles.info}>{start}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </Swipeable>
    );
  }

  render() {
    let hasSavedRecs = this.props.savedRecommendations.length > 0;

    return (
      !hasSavedRecs ?
      /* Empty view */
      <View style={[this.props.style, styles.scene, styles.empty]}>
        <Text style={styles.emptyText}>{'No <3\'d recommendations'}.</Text> 
      </View> :

      /* Default view */
      <ScrollView style={[this.props.style, styles.scene]}>
        {this.props.savedRecommendations
          .sort((a, b) => moment(b.event.time.start).isBefore(a.event.time.start))
          .map(savedRec => this._renderSavedRec(savedRec))}
      </ScrollView>
    );
  }
}
