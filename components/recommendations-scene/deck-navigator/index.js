'use strict';

import React, {Component, View, Text, Animated, Dimensions} from 'react-native';
import styles from './styles';

import TouchResponder from '../touch-responder';
import Edge from '../edge';

// USE:
// <DeckNavigator
//   onSwipeRight={()=> handleRight()}
//   onSwipeLeft={()=> handleLeft()}>
//   <Recommendation />
// </DeckNavigator>



export default class DeckNavigator extends Component {

  defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
  };

  state = {
    // Card position values
    axis: 'y',

    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    distance: new Animated.Value(0),

    // Edge thickness
    left: new Animated.Value(0),
    right: new Animated.Value(0),
  };

  // Touchable
  touchResponder = this.createTouchResponder();

  createTouchResponder(){

    var touchResponder = new TouchResponder({
      onSwipeRelease: this.swipeAway.bind(this),
      onDragRelease: this.returnToBaseline.bind(this),
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

  swipeAway(e, gestureState, touchState) {

    let width = Dimensions.get('window').width;

    // if axis is x and distnce is positive, animate right
    if(touchState.axis === 'x'){
      let offscreenDistance = (touchState.distance > 0) ? width : -width

      // Get the right speed for the swipe
      let duration = Math.abs(touchState.distance) / Math.abs(gestureState.vx);
      let direction = (this.state.left._value) ? 'left' : 'right';

      Animated.parallel([

        // No easing needed here
        Animated.timing(this.state.distance, {
          toValue: offscreenDistance,
          duration: duration,
        }),

        Animated.timing(this.state.left, this.resetToZero),
        Animated.timing(this.state.right, this.resetToZero),

      ]).start(function() {

        if (this.state.left) {
          this.props.onSwipeLeft();
        } else if (this.state.right) {
          this.props.onSwipeRight();
        }

        // Reset the card view
        this.state.scale.setValue(0.8);
        this.state.opacity.setValue(0);
        this.state.distance.setValue(0);
        this.state.left.setValue(0);
        this.state.right.setValue(0);

        this.returnToBaseline();

      }.bind(this));
    }
  };

  resetToOne = {
    toValue: 1,
    duration: 200
  };

  resetToZero = {
    toValue: 0,
    duration: 200
  };

  returnToBaseline() {
    Animated.parallel([
      Animated.spring(this.state.scale, this.resetToOne),
      Animated.spring(this.state.opacity, this.resetToOne),

      Animated.spring(this.state.distance, this.resetToZero),
      Animated.spring(this.state.left, this.resetToZero),
      Animated.spring(this.state.right, this.resetToZero),
    ]).start();
  }

  getDeckStyles(){
    return {
      opacity: this.state.opacity,
      flex: 1,
      transform: [
        {translateX: (this.state.axis === 'x') ? this.state.distance : 0},
        {scale: this.state.scale},
      ]
    }
  }

  render() {
    return (
      <View style={styles.deck}>

        <Edge
          containerHeight={600} 
          position={'right'}
          thickness={this.state.right}>
          <Text style={styles.label}>
            Colder
          </Text>
        </Edge>

        <Edge
          containerHeight={600} 
          position={'left'}
          thickness={this.state.left}>
          <Text style={styles.label}>
            Warmer
          </Text>
        </Edge>

        <Animated.View style={this.getDeckStyles()} {...this.touchResponder.panHandlers}>
          {this.props.children}
        </Animated.View>

      </View>
    );
  }


}
