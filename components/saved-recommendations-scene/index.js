'use strict';

import React, {Component, StyleSheet, Dimensions, View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import moment from 'moment';

import Swipeable from '../swipeable';
import Card from '../card';

import Icon from 'react-native-vector-icons/MaterialIcons';

const CARD_CLICK_ACTIVE_OPACITY = 0.7

export default class SavedRecommendationsScene extends Component {

  static contextTypes = {
    theme: React.PropTypes.object,
  };

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
        <Icon name="not-interested" style={[styles.edgeLabel, this.context.theme.negativeAction]} />
      </TouchableOpacity>;

    let swipeableProps = {
      onSwipeLeft: this.removeRecommendation.bind(this, recommendation),
      leftSwipeEdge,
      pinThresholdLeft: 0.3,
      pinOffsetLeft: 100,
    };

    return (
      <Swipeable {...swipeableProps} key={recommendation.id}>
        <Card style={styles.card}>
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
      <View style={[styles.flexFull, styles.empty]}>
        <Text style={styles.emptyText}>{'No <3\'d recommendations'}.</Text> 
      </View> :

      /* Default view */
      <ScrollView style={[styles.flexFull, this.props.style]}>
        {this.props.savedRecommendations
          .sort((a, b) => moment(b.event.time.start).isBefore(a.event.time.start))
          .map(savedRec => this._renderSavedRec(savedRec))}
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  flexFull: {
    flex: 1,
  },

  edgeContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
  },

  edgeLabel: {
    fontSize: 60,
    fontWeight: '900',
    padding: 10,
    textAlign: 'center',
  },

  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    color: '#fff',
    textAlign: 'center',
  },

  card: {
    marginBottom: 0,
  },

  recommendationContainer: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  recommendationTextContainer: {
    flex: 0.7,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.25)',
  },

  recommendationText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: 8
  },

  recommendationTitle: {
    fontSize: 12,
    color: '#000',
    paddingBottom: 16, 
  },

  recommendationDescription: {
    fontSize: 10,
    color: '#111',
    paddingBottom: 8,
  },

  info: {
    fontSize: 10,
    color: '#ccc',
    paddingBottom: 4
  },

  recommendationImage: {
    width: 100,
    height: 100,
  }

});
