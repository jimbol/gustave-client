'use strict';

import React, {Component, View} from 'react-native';

import styles from './styles';

export default class Card extends Component {
  render() {
    return (
      <View style={styles.card}>
        {this.props.children}
      </View>
    );
  }
}
