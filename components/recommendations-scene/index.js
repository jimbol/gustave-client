'use strict';

import React, {Component, View, Text, Animated} from 'react-native';
import styles from './styles';
import Recommendation from '../recommendation';
import Button from '../button';
import TouchResponder from '../touch-responder';
import Edge from '../edge';
import Dimensions from 'Dimensions';

export default class RecommendationsScene extends Component {

  state = {
    index: 2,

    // Card position values
    axis: 'y',
    distance: new Animated.Value(0),

    // Edge thickness
    left: new Animated.Value(0),
    right: new Animated.Value(0),
  };

  constructor(){
    super();
    this.touchResponder = this.createTouchResponder()
  }

  nextRec() {
    this.setState({index: this.getNextIndex()});
  }

  getNextIndex() {
    if (this.state.index >= this.props.recommendations.length - 1){
      return 0;
    } else {
      return this.state.index + 1;
    }
  }

  viewDetail(){
    this.props.viewDetail(this.getCurrentRecommendation());
  }

  viewConcierge(){
    this.props.viewConcierge(this.getCurrentRecommendation());
  }

  getCurrentRecommendation(){
    return this.props.recommendations[this.state.index];
  }

  // Touchable
  createTouchResponder(){
    var _this = this;

    var touchResponder = new TouchResponder({
      onSwipeRelease: this.swipeAway.bind(this),
      onDragRelease: this.returnToOrigin.bind(this),
      onMove: this.onMove.bind(this),
    });

    return touchResponder;
  }

  onMove(e, gestureState, touchState){

    this.setState({
      axis: touchState.axis,
    });

    this.state.distance.setValue(touchState.distance)
    this.state.left.setValue(Math.abs(touchState.left));
    this.state.right.setValue(Math.abs(touchState.right));
  }

  width = Dimensions.get('window').width;

  swipeAway(e, gestureState, touchState) {

    // if axis is x and distnce is positive, animate right
    if(touchState.axis === 'x'){
      var offscreenDistance = (touchState.distance > 0) ? this.width : -this.width

      // Get the right speed for the swipe
      var duration = Math.abs(touchState.distance) / Math.abs(gestureState.vx);

      Animated.parallel([
        // No easing needed here
        Animated.timing(this.state.distance, {
          toValue: offscreenDistance,
          duration: duration,
        }),
        Animated.timing(this.state.left, this.resetHash),
        Animated.timing(this.state.right, this.resetHash),
      ]).start();
    }
  };

  resetHash = {
    toValue: 0,
    duration: 200
  };

  returnToOrigin() {
    Animated.parallel([
      Animated.spring(this.state.distance, this.resetHash),
      Animated.spring(this.state.left, this.resetHash),
      Animated.spring(this.state.right, this.resetHash),
    ]).start();
  }

  cardTransform(){
    return {
      flex: 1,
      transform: [
        {translateX: (this.state.axis === 'x') ? this.state.distance : 0},
      ]
    }
  }

  render() {
    let recommendation = this.getCurrentRecommendation();

    return (
      <View style={[this.props.style, styles.scene]} {...this.touchResponder.panHandlers}>

        <Edge
          containerHeight={600}
          position={'right'}
          thickness={this.state.right}>
          <Text style={{padding: 10, color: '#fff', width: 150, textAlign: 'center'}}>
            Warmer
          </Text>
        </Edge>

        <Edge
          containerHeight={600}
          position={'left'}
          thickness={this.state.left}>
          <Text style={{padding: 10, color: '#fff', width: 150, textAlign: 'center'}}>
            Colder
          </Text>
        </Edge>

        <Animated.View style={this.cardTransform()}>
          <Recommendation
            recommendation={recommendation}
            viewDetail={this.viewDetail.bind(this)} />
        </Animated.View>

        <Button
          buttonStyle={styles.commitButton}
          buttonTextStyle={styles.commitButtonText}
          onPress={this.viewConcierge.bind(this)}>
          G!
        </Button>
      </View>
    );
  }


}
