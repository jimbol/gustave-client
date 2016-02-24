'use strict';

import React, {Component, View, Animated} from 'react-native';

import styles from './styles';

export default class Card extends Component {

  static propTypes = {
    cardStyle: View.propTypes.style,
  };

  state = {
    scale: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.scale, {toValue: 1, duration: 200}).start();
  }

  render() {

    let transforms = [{scale: this.state.scale}, ];

    return (
      <Animated.View style={[styles.card, this.props.cardStyle, {transform: transforms}]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
