'use strict';
import React, {
  AppRegistry,
  Component,
  Text,
  View
} from 'react-native';

import styles from './styles';

export default class Button extends Component {

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <View ref={component => this._root = component} {...this.props}>
        <Text style={styles.button}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}
