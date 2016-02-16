'use strict';
import React, {
  AppRegistry,
  Component,
  Text
} from 'react-native';

import styles from './styles';

class Button extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Text style={styles.button}>
        {this.props.children}
      </Text>
    );
  }
}

module.exports = Button;

AppRegistry.registerComponent('Button', () => Button);
