'use strict';

import React, {Component, View, Text, Image, Animated, Easing, TouchableOpacity, Dimensions} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Details from './details';
import Teaser from './teaser';

const TO_HIDDEN = {
  toValue: 0,
  duration: 250,
  easing: Easing.elastic(1),
}

const TO_SHOWN = {
  toValue: 1,
  duration: 250,
  easing: Easing.elastic(1),
}

export default class Recommendation extends Component {

  static contextTypes = {
    user: React.PropTypes.object,
    database: React.PropTypes.object,
  };

  static propTypes = {
    recommendation: React.PropTypes.object,
    willFocus: React.PropTypes.func,
    onLayout: React.PropTypes.func,
    onToggleRecommendation: React.PropTypes.func,
  };

  state = {
    isDetailed: false,
    recAnimation: new Animated.Value(1),
    imageAnimation: null,
    fontSizeAnimation: null,
    fontPaddingAnimation: null,

    detailAnimation: new Animated.Value(0),
  };

  componentDidMount() {
    // accounts for each ui element
    var {height} = Dimensions.get('window');

    let offset = 50 + 20 + 20 + 4 + 4;
    let cardHeight = (height - offset);

    this.setState({
      imageAnimation: this.state.recAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [cardHeight/5, cardHeight/2],
      }),
      fontSizeAnimation: this.state.recAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 32],
      }),
      fontPaddingAnimation: this.state.recAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [4, 8],
      }),
    });
  }

  toggleRecommendation() {
    let userId = this.context.user.id;
    let recId = this.props.recommendation.id;
    let db = this.context.database;

    let isUserSaved = db.isUserSavedRecommendation(userId, recId);

    if (isUserSaved)
      db.removeSavedUserRecommendation(userId, recId);
    else
      db.saveUserRecommendation(userId, recId);

    this.props.onToggleRecommendation(recId);
  }

  toggleLayout() {
    // Needed to notify parent that the view is going to toggle, and what the new state will be
    if(this.props.willToggle)
      this.props.willToggle(!this.state.isDetailed);

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
    return { height: this.state.imageAnimation };
  }

  getTitleStyles(){
    return {
      fontSize: this.state.fontSizeAnimation,
      padding: this.state.fontPaddingAnimation,
    }
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

    let isUserSaved = this.context.database
      .isUserSavedRecommendation(this.context.user.id, this.props.recommendation.id);

    return (
      <View
        style={[styles.container, !this.state.isDetailed ? styles.flexFull : styles.flexNone]}
        // Must pass the prop function down to notify parent of new sizes on toggle
        onLayout={this.props.onLayout}>

        <Animated.Image
          style={[this.getImageStyles(), styles.backgroundImage]}
          source={{uri: place.photo.uri}}>

          <Animated.Text numberOfLines={1} style={[styles.title, this.getTitleStyles()]}>
            {event.name}
          </Animated.Text>
          <Animated.Text numberOfLines={1} style={[styles.title, this.getTitleStyles()]}>
            @ {place.name}
          </Animated.Text>

          <View style={styles.overlay}>
            <TouchableOpacity onPress={this.toggleLayout.bind(this)}>
              <Icon name="info-outline" size={30} style={styles.topButtonIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleRecommendation.bind(this)}>
              <Icon name={isUserSaved ? 'favorite' : 'favorite-border'} size={30} style={[styles.topButtonIcon]}></Icon>
            </TouchableOpacity>
          </View>
        </Animated.Image>

        {partial}

      </View>
    );
  }
}
