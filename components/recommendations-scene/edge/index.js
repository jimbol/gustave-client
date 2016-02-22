'use strict';

// USE:
// <Edge position={'top'} thickness={140} containerHeight={120} containerWidth={420}>
//   <Menu>Derp</Menu>
// </Edge>

import React, {Component, Animated} from 'react-native';
import _ from 'lodash';

import styles from './styles';

export default class Edge extends Component {

  static propTypes = {
    containerHeight: React.PropTypes.number,
    containerWidth: React.PropTypes.number,
    position: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
  };

  createStyles() {
    let height, width;
    let position = this.props.position;

    if (position === 'top' || position === 'bottom') {
      height = this.props.thickness;
      width = this.props.containerWidth;
    } else {
      height = this.props.containerHeight;
      width = this.props.thickness;
    }

    return { height, width }; 
  }

  render() {
    return (
      <Animated.View style={[styles[this.props.position], this.createStyles()]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
