'use strict';

import React, {PanResponder} from 'react-native';
import _ from 'lodash';
import Dimensions from 'Dimensions';

// import * as styles from './styles';

export default class Gustave extends Component {

  constructor(props){
    super(props);
    this.styles = styles.create(Dimensions.get('window'));

    this.panResponder = PanResponder.create({

      // Ask to be the responder:
      onStartShouldSetPanResponder:this.passingFn,
      onStartShouldSetPanResponderCapture:this.passingFn,
      onMoveShouldSetPanResponder:this.passingFn,
      onMoveShouldSetPanResponderCapture:this.passingFn,
      onPanResponderTerminationRequest:this.passingFn,
      onShouldBlockNativeResponder:this.passingFn

      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderTerminate: (evt, gestureState) => {},

      onPanResponderMove: (evt, gestureState) => this.onPanResponderMove(evt, gestureState),
      onPanResponderRelease: (evt, gestureState) => this.onPanResponderRelease(evt, gestureState),
    });
  }

  onPanResponderMove(evt, gestureState) {
    if(this.offScreen){
      return;
    }

    var xRatio = Math.abs(gestureState.dx) / this.state.width;
    var yRatio = Math.abs(gestureState.dy) / this.state.height;

    var x = 0;
    var y = 0;

    if (xRatio >= yRatio) {
      x = gestureState.dx
      y = 0
    } else if (xRatio < yRatio) {
      x = 0
      y = gestureState.dy
    }

    this.state.top.setValue((y > 0) ? y : 0);
    this.state.bottom.setValue((y < 0) ? Math.abs(y) : 0);
    this.state.right.setValue((x < 0) ? Math.abs(x) : 0);
    this.state.left.setValue((x > 0) ? x : 0);

    this.state.x.setValue(x);
    this.state.y.setValue(y);
  }

  offScreen = false;

  getGestureDetails(gestureState) {
    var vx = gestureState.vx;
    var vy = gestureState.vy;

    var absvx = Math.abs(vx);
    var absvy = Math.abs(vy);

    if (absvx > 1 || absvy > 1){

      if(absvx > absvy) {
        var axis = 'x';
        var offset = this.state.width + 10;
        var direction = 'left';

        if(vx < 0){
          var offset = -offset;
          direction = 'right';
        }

      } else {
        var axis = 'y';
        var offset = this.state.height;
        var direction = 'top';

        if(vy < 0){
          var offset = -offset;
          direction = 'bottom';
        }
      }

      return {
        axis: axis,
        direction: direction,
        offset: offset
      }
    }
  }

  onPanResponderRelease(evt, gestureState) {
    if(this.offScreen){
      return;
    }

    var gestureDetails = this.getGestureDetails(gestureState)

    if (gestureDetails){
      this.carryCardAway(gestureDetails)
      this.offScreen = true
    }

    if(this.offScreen){
      return;
    }

    this.resetMenus();
    this.resetCard()
  }

  carryCardAway(gestureDetails){
    var axis = gestureDetails.axis;
    var offset = gestureDetails.offset;
    var direction = gestureDetails.direction;

    Animated.parallel([
      Animated.timing(this.state[axis], {
        toValue: offset,
        duration: 100
      }),
      Animated.timing(this.state[direction], {
        toValue: (axis === 'x') ? this.state.width : this.state.height,
        duration: 100
      }),
    ]).start(() => this.resetCard());
  }

  _resetValue = {
    toValue: 0,
    duration: 200
  };

  getXYResetAnimation(){
    return [
      Animated.timing(this.state.x, this._resetValue),
      Animated.timing(this.state.y, this._resetValue)
    ]
  }

  resetCard(){
    var sequence = [];

    if(this.offScreen){
      sequence.push(Animated.delay(400));
    }

    sequence.push(Animated.parallel(this.getXYResetAnimation()))

    Animated.sequence(sequence).start(() => this.offScreen = false);
  }

  resetMenus(){
    Animated.parallel([
      Animated.timing(this.state.top, this._resetValue),
      Animated.timing(this.state.bottom, this._resetValue),
      Animated.timing(this.state.right, this._resetValue),
      Animated.timing(this.state.left, this._resetValue),
    ]).start();
  }

  getCardStyles() {
    return {
      transform: [
        {translateX: this.state.x},
        {translateY: this.state.y}
      ]
    }
  }

  fullHeight() {
    return {height: this.state.height}
  }

  fullWidth() {
    return {width: this.state.width}
  }


  passingFn = (evt, gestureState) => true;

  static defaultProps = {
    recs: data
  };

  onCommit(recommendation){
    console.log(recommendation);
  }

  render() {
    return (
      <View style={[styles.container, this.fullHeight(), this.fullWidth()]} {...this.panResponder.panHandlers}>


        <StickyMenu edge="top" change={this.state.top}>
          Menu
        </StickyMenu>
        <StickyMenu edge="left" change={this.state.left}>
          Yea!
        </StickyMenu>
        <StickyMenu edge="right" change={this.state.right}>
          Nah.
        </StickyMenu>
        <StickyMenu edge="bottom" change={this.state.bottom}>
          Maybe later.
        </StickyMenu>

        <View style={styles.cardContainer}>
          <Animated.View>
            {this.props.children}
          </Animated.View>
        </View>

      </View>
    );
  }
}
