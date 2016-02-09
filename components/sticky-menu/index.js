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
import styles from './styles';

class StickyMenu extends Component {
  constructor(args) {
    super();
    var windowDimensions = Dimensions.get('window');

    this.state = {
      edge: args.edge, // top, bottom, left, right
      opacity: 1,
      height: windowDimensions.height,
      width: windowDimensions.width,

      change: args.change,
    }
  }

  getStyles() {
    var vert = this.state.edge === 'left' || this.state.edge === 'right';

    var change = this.state.change;

    return {
      height: (vert) ? this.state.height : change,
      width:  (!vert) ? this.state.width : change,
    }
  }

  render() {
    return (
      <Animated.View style={[styles[this.state.edge], this.getStyles()]}>
        <Text style={styles.label}>
          {this.props.children}
        </Text>
      </Animated.View>
    );
  }
}

AppRegistry.registerComponent('StickyMenu', () => StickyMenu);

module.exports = StickyMenu;
