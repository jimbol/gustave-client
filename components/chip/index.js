'use strict';

import React, {
  AppRegistry,
  Component,
  Text,
  View
} from 'react-native';

import styles from './styles';

export default class Chip extends Component {

  static propTypes = {
    chipStyle: View.propTypes.style,
    chipTextStyle: Text.propTypes.style,
  };

  render() {
    return (
      <View style={[styles.chip, this.props.chipStyle]}>
        <Text style={[styles.chipText, this.props.chipTextStyle]}>
          {this.props.children}
        </Text>
      </View>
    );
  }

}

