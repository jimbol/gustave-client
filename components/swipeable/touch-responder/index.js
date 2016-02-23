'use strict';

import React, {PanResponder} from 'react-native';
import _ from 'lodash';
import Dimensions from 'Dimensions';

// USE:
// Only supports single touch
//
// new TouchResponder({
//   onSwipeRelease: function(evt, gestureState, touchState){
//     if(touchState.direction === 'right'){
//       // Do something
//     } else if(touchState.direction === 'down'){
//       // Do something else
//     }
//   }
//
//   onDragRelease: (evt, gestureState, touchState) => doSomething(touchState)
//   onMove: (evt, gestureState, touchState) => doSomething(touchState)
// });


/**
 *  TODO:   
 *    This should be configurable to respond in none, many, or all cardinal directions
 */


export default class TouchResponder {


  constructor(props){
    var passingFn = () => true;

    this.touchLifeCycle = {
      onSwipeRelease: props.onSwipeRelease || passingFn,
      onDragRelease: props.onDragRelease || passingFn,
      onMove: props.onMove || passingFn,
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: passingFn,

      onPanResponderMove: (evt, gestureState) => this.onPanRespond(evt, gestureState, 'move'),
      onPanResponderRelease: (evt, gestureState) => this.onPanRespond(evt, gestureState, 'release'),
    });

    this.panHandlers = this.panResponder.panHandlers
  }

  railAxis = null;
  onPanRespond(evt, gestureState, evtType) {

    var cb = this.touchLifeCycle.onMove;
    var isSwiping = false;

    var absXVelocity = Math.abs(gestureState.vx);
    var absYVelocity = Math.abs(gestureState.vy);

    if (this.railAxis == null){

      if(absXVelocity > absYVelocity) {
        this.railAxis = 'x';
      } else {
        this.railAxis = 'y';
      }
    }

    if(this.railAxis === 'x') {
      var axis = 'x';
      var distance = gestureState.dx;

      var x = gestureState.dx;
      var y = 0;
    } else {
      var axis = 'y';
      var distance = gestureState.dy;

      var x = 0
      var y = gestureState.dy
    }

    if(absXVelocity > 1 || absYVelocity > 1) {
      isSwiping = true;
      if (evtType === 'release'){
        cb = this.touchLifeCycle.onSwipeRelease;
      }
    } else if (evtType === 'release'){
      cb = this.touchLifeCycle.onDragRelease;
    }

    var touchState = {
      axis: this.railAxis,
      distance: distance,
      top: (y > 0) ? y : 0,
      bottom: (y < 0) ? Math.abs(y) : 0,
      right: (x < 0) ? Math.abs(x) : 0,
      left: (x > 0) ? x : 0,
    };

    if (evtType === 'release'){
      this.railAxis = null;
    }

    cb(evt, gestureState, touchState);
  }
}
