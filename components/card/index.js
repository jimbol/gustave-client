'use strict';

import React, {Component, View} from 'react-native';

import styles from './styles';

export default class Card extends Component {

  static propTypes = {
    cardStyle: View.propTypes.style,
  }

  render() {
    return (
      <View style={[styles.card, this.props.cardStyle]}>
        {this.props.children}
      </View>
    );
  }
}
