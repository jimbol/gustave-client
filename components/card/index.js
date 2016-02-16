'use strict';
import React, {
  AppRegistry,
  Component,
  View
} from 'react-native';

import styles from './styles';

export default class Card extends Component {

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <View ref={component => this._root = component} {...this.props} style={styles.card}>
        {this.props.children}
      </View>
    );
  }
}
