'use strict';
import React, {
  AppRegistry,
  Component,
  Text,
  View
} from 'react-native';

import styles from './styles';

class Chip extends Component {
  constructor() {
    super()
  }


  render() {
    var chipStyles = [styles.chip];

    // This can be expanded with other icons
    if (this.props.icon) {
      chipStyles.push(styles.chipWithImage)

      var icon =
        <Text style={styles.chipStar}>
          &#9733;
        </Text>
    }


    return (
      <View style={chipStyles}>
        {icon}
        <Text style={styles.chipText}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}

module.exports = Chip;

AppRegistry.registerComponent('Chip', () => Chip);
