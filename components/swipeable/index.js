'use strict';

import React, {Component, View, Text, Animated, Dimensions} from 'react-native';
import styles from './styles';

import TouchResponder from './touch-responder';
import Edge from './edge';

// USE:
// <DeckNavigator
//   onSwipeRight={()=> handleRight()}
//   onSwipeLeft={()=> handleLeft()}>
//   <Recommendation />
// </DeckNavigator>


export default class Swipeable extends Component {

  static propTypes = {
    onSwipeLeft: React.PropTypes.func,
    onSwipeRight: React.PropTypes.func,
    leftSwipeEdge: React.PropTypes.node,
    rightSwipeEdge: React.PropTypes.node,
  };

  state = {
    // Card position values
    axis: 'x',

    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    distance: new Animated.Value(0),

    // Edge thickness
    left: new Animated.Value(0),
    right: new Animated.Value(0),

    // Height for edges
    edgeHeight: 0,
    edgeWidth: 0,
  };

  // Touchable
  touchResponder = new TouchResponder({
    onSwipeRelease: this.swipeAway.bind(this),
    onDragRelease: this.returnToBaseline.bind(this),
    onMove: this.onMove.bind(this),
  });

  checkImplemented(e, gestureState, touchState) {

    // Right offset indicates left swipe, and vice versa 
    if (touchState.left && this.props.onSwipeRight) {
      return true;
    }

    if (touchState.right && this.props.onSwipeLeft) {
      return true;
    }

    return false;
  }

  onMove(e, gestureState, touchState){

    if(!this.checkImplemented(e, gestureState, touchState)) {
      return null;
    }

    if (touchState.axis !== this.state.axis) {
      this.setState({
        axis: touchState.axis,
      });
    }

    this.state.distance.setValue(touchState.distance)
    this.state.left.setValue(Math.abs(touchState.left));
    this.state.right.setValue(Math.abs(touchState.right));
  }

  swipeAway(e, gestureState, touchState) {

    if(!this.checkImplemented(e, gestureState, touchState)) {
      return null;
    }

    let width = Dimensions.get('window').width;

    // if axis is x and distance is positive, animate right
    if(touchState.axis === 'x') {
      let offscreenDistance = (touchState.distance > 0) ? width : -width

      // Get the right speed for the swipe
      let duration = Math.abs(touchState.distance) / Math.abs(gestureState.vx);

      Animated.parallel([

        // No easing needed here
        Animated.timing(this.state.distance, {
          toValue: offscreenDistance,
          duration: duration,
        }),

        Animated.timing(this.state.left, this.resetToZero),
        Animated.timing(this.state.right, this.resetToZero),

      ]).start(() => {

        // Right offset indicates left swipe, and vice versa 
        if (touchState.right) {
          this.props.onSwipeLeft();
        } else if (touchState.left) {
          this.props.onSwipeRight();
        }

        // Reset the card view
        this.state.scale.setValue(0.8);
        this.state.opacity.setValue(0);
        this.state.distance.setValue(0);
        this.state.left.setValue(0);
        this.state.right.setValue(0);

        this.returnToBaseline();

      });
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

  // Spring might be causing problems
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

  setEdgeHeight(event) {
    let {x, y, width, height} = event.nativeEvent.layout;
    if (height !== this.state.edgeHeight) {
      this.setState({edgeHeight: height});
    }
  }

  render() {
    return (
      <View onLayout={this.setEdgeHeight.bind(this)} style={styles.container}>

        {this.props.rightSwipeEdge && 
          <Edge
            containerHeight={this.state.edgeHeight} 
            position={'left'}
            thickness={this.state.left}>
            {this.props.rightSwipeEdge}
          </Edge>
        }

        {this.props.leftSwipeEdge && 
          <Edge
            containerHeight={this.state.edgeHeight} 
            position={'right'}
            thickness={this.state.right}>
            {this.props.leftSwipeEdge}
          </Edge>
        }

        <Animated.View style={this.getDeckStyles()} {...this.touchResponder.panHandlers}>
          {this.props.children}
        </Animated.View>

      </View>
    );
  }


}
