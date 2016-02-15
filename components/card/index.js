'use strict';
import React, {
  AppRegistry,
  Component,
  View
} from 'react-native';

import styles from './styles';

class Card extends Component {
  constructor() {
    super()
  }


  render() {
    return (
      <View style={styles.card}>
        {this.props.children}
      </View>
    );
  }
}

module.exports = Card;

AppRegistry.registerComponent('Card', () => Card);
