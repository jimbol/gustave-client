'use strict';

import React, {Component, View, Text, Image, Animated, Easing} from 'react-native';
import styles from './styles';
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

import ChipList from './chip-list';
import Details from './details';
import Teaser from './teaser';
import Button from '../button';

const TO_HIDDEN = {
  toValue: 0,
  duration: 200,
  easing: Easing.easeInOutCirc,
}

const TO_SHOWN = {
  toValue: 1,
  duration: 200,
  easing: Easing.easeInOutCirc,
}

export default class Recommendation extends Component {
  state = {
    isDetailed: false,
    recAnimation: new Animated.Value(1),
    imageAnimation: .5,
    fontSizeAnimation: .5,

    detailAnimation: new Animated.Value(0),
  };

  componentWillMount() {
    this.setState({
      imageAnimation: this.state.recAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [.25, 1],
      }),
      fontSizeAnimation: this.state.recAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 36],
      })
    });
  }


  toggleLayout() {
    if(this.state.isDetailed){
      this.showRecommendation();
    } else {
      this.hideRecommendation();
    }
  }

  hideRecommendation() {
    this.composeAnimations(this.state.recAnimation, this.state.detailAnimation, true);
  }

  showRecommendation() {
    this.composeAnimations(this.state.detailAnimation, this.state.recAnimation, false);
  }

  composeAnimations(toHide, toShow, isDetailed) {
    return Animated.timing(toHide, TO_HIDDEN)
      .start(function(){
        this.setState({isDetailed: isDetailed});

        Animated.timing(toShow, TO_SHOWN).start();
      }.bind(this));
  }

  getImageStyles(){
    return { flex: this.state.imageAnimation };
  }

  getTitleStyles(){
    return { fontSize: this.state.fontSizeAnimation, }
  }

  getRecStyles(){
    return { opacity: this.state.recAnimation }
  }

  getDetailStyles(){
    return { opacity: this.state.detailAnimation }
  }

  createRecView(event, place){
    return (
      <Animated.View style={[styles.container, this.getRecStyles()]}>
        <Teaser event={event} place={place} />
      </Animated.View>
    );
  }

  createDetailView(event, place){
    return (
      <Animated.View style={[styles.container, this.getDetailStyles()]}>
        <Details event={event} place={place} />
      </Animated.View>
    );
  }

  render() {
    let rec = this.props.recommendation;
    let event = rec.event;
    let place = rec.place;
    let partial = (this.state.isDetailed)
      ? this.createDetailView(event, place)
      : this.createRecView(event, place);

    return (
      <View style={styles.container}>

        <Animated.Image
          style={this.getImageStyles()}
          source={{uri: place.photo.uri}}>

          <View style={styles.overlay} />

          <Icon name="info-outline" size={30} style={styles.infoButton} onPress={this.toggleLayout.bind(this)} />

          <Animated.Text numberOfLines={2} style={[styles.eventName, this.getTitleStyles()]}>
            {event.name}
          </Animated.Text>
          <Animated.Text numberOfLines={2} style={[styles.location, this.getTitleStyles()]}>
            @ {place.name}
          </Animated.Text>
        </Animated.Image>

        {partial}

      </View>
    );
  }
}
