'use strict';

import React, {
  Component,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import styles from './styles';

export default class Button extends Component {

  static propTypes = {
    buttonStyle: View.propTypes.style,
    buttonTextStyle: Text.propTypes.style,
    onPress: React.PropTypes.func,
  };

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={[styles.button, this.props.buttonStyle]}>
        <Text style={[styles.buttonText, this.props.buttonTextStyle]}>
          {this.props.children}
        </Text>
      </TouchableHighlight>
    );
  }
}
