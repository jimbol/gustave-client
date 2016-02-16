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
    chipIconStyle: View.propTypes.style,
    chipIconTextStyle: Text.propTypes.style,
    chipIcon: React.PropTypes.string,
  };


  render() {
    return (
      <View style={[styles.chip, this.props.chipIcon && styles.chipWithImage, this.props.chipStyle]}>
        <View style={this.props.chipIcon && styles.chipIcon}>
          <Text style={this.props.chipIcon && [styles.chipText, styles.chipIconText, this.props.chipTextStyle, this.props.chipIconTextStyle]}>
            {this.props.chipIcon}
          </Text>       
        </View>
        <Text style={[styles.chipText, this.props.chipTextStyle]}>
          {this.props.children}
        </Text>
      </View>
    );
  }

}

