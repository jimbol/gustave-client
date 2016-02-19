'use strict';

// USE:
// <Edge position={'top'} height={120} width={420}>
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

    this.state = {
      height: props.height,
      width: props.width,
    }
  }

  render() {
    return (
      <Animated.View style={[styles[this.position], this.state]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
