'use strict';

import React, {
  Component,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import styles from './styles';

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight {...this.props} style={[this.props.style, styles.container]}>
        <Text style={styles.text}>
          {this.props.children}
        </Text>
      </TouchableHighlight>
    );
  }
}
