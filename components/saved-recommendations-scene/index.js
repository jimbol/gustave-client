'use strict';

import React, {Component, View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import moment from 'moment';
import styles from './styles';

import Swipeable from '../swipeable';

export default class SavedRecommendationsScene extends Component {

  static propTypes = {
    savedRecommendations: React.PropTypes.array,
  };

  _renderSavedRec(recommendation) {
    let event = recommendation.event;
    let place = event.place;
    let start = moment(event.time.start).format('ddd MM/DD @ h:mm A');
    let end  = moment(event.time.end).format('ddd MM/DD @ h:mm A');

    let leftEdge = <View style={styles.edgeContainer}><Text style={styles.edgeLabel}>Remove</Text></View>;

    return (
      <Swipeable
          onSwipeLeft={()=>{}}
          leftSwipeEdge={leftEdge}
          stickyThreshold={0.4}
          stickyOffset={-100} >

        <TouchableOpacity 
          onPress={() => this.props.viewRecommendation(recommendation)} 
          key={recommendation.id}>

          <View style={styles.recommendationContainer}>

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

            <Image  
              style={styles.recommendationImage}
              source={{uri: place.photo.uri}}/>

          </View>
          
        </TouchableOpacity>
        
      </Swipeable>
    );
  }

  render() {
    return (
      <ScrollView style={[this.props.style, styles.scene]}>
        {this.props.savedRecommendations
          .sort((a, b) => moment(b.event.time.start).isBefore(a.event.time.start))
          .map(savedRec => this._renderSavedRec(savedRec))}
      </ScrollView>
    );
  }
}
