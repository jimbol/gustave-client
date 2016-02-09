'use strict';
import React, {
  AppRegistry,
  Animated,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Dimensions from 'Dimensions';
import styles from '../../styles';

class Card extends Component {
  constructor(args) {
    super();

    var windowDimensions = Dimensions.get('window');

    this.state = {
      height: windowDimensions.height,
      width: windowDimensions.width,
      x: args.x,
      y: args.y,
    }
  }

  getCardStyles() {
    return {
      transform: [
        {translateX: this.state.x},
        {translateY: this.state.y}
      ]
    }
  }

  fullSize() {
    return {
      height: this.state.height,
      width: this.state.width
    }
  }

  render() {
    return (
      <Animated.View style={[styles.card, this.getCardStyles(), this.fullSize()]}>
        <Text style={styles.subTitle}>
          Drinks with friends at
        </Text>
        <Text style={styles.title}>
          Cafe Mustache
        </Text>
        <Text style={styles.subTitle}>
          $ · Cafe
        </Text>
        <Text style={styles.text}>
          Address: 2313 N Milwaukee Ave, Chicago, IL 60647{"\n"}
          Phone:(773) 687-9063{"\n"}
          Hours: Open today · 7AM–2AM{"\n"}
          Menu: cafemustache.com
        </Text>
        <Text style={styles.text}>
          Hip hangout offering coffee, local microbrews & light bites in chill quarters with an eclectic look.
        </Text>
      </Animated.View>
    );
  }
};

AppRegistry.registerComponent('Card', () => Card);

module.exports = Card;
