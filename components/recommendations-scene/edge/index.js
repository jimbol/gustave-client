'use strict';

// USE:
// <Edge position={'top'} thickness={140} containerHeight={120} containerWidth={420}>
//   <Menu>Derp</Menu>
// </Edge>

import React, {Component, Animated} from 'react-native';
import _ from 'lodash';

import * as styles from './styles';

export default class Edge extends Component {
  constructor(props) {
    super(props);

    // top, bottom, left, right
    this.position = props.position;
    this.containerHeight = props.containerHeight;
    this.containerWidth = props.containerWidth;

    this.state = {
      thickness: props.thickness,
    }
  }

  createStyles(){
    var position = this.position

    if (position === 'top' || position === 'bottom') {
      var height = this.state.thickness;
      var width = this.containerWidth;
    } else {
      var height = this.containerHeight;
      var width = this.state.thickness;
    }

    return {
      height: height,
      width: width,
    };
  }

  render() {
    return (
      <Animated.View style={[styles[this.position], this.createStyles()]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
