'use strict';
import React, {
  AppRegistry,
  Animated,
  Component,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Dimensions from 'Dimensions';

class StickyMenu extends Component {
  constructor(args) {
    super();
    this.state = {
      edge: args.edge // top, bottom, left, right
    }
  }

  getStyles() {
    return {
      height: 150,
      width: 420,
      backgroundColor: '#009999'
    }
  }

  render() {
    return (
      <Animated.View style={[styles[this.state.edge], this.getStyles()]}>
        <Text style={styles.label}>
          {this.state.edge}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    flex: 1,
    textAlign:'center',
    color: 'white',
    fontSize: 24,
    width: 300
  },

  top: {
    flexDirection: 'row',
    alignItems:'center',
    position: 'absolute',
    backgroundColor: 'gray',
    overflow: 'hidden'
  },
  left: {
    position: 'absolute',
    alignItems:'center',
    backgroundColor: 'green',
    overflow: 'hidden'
  },
  right: {
    right: 0,
    position: 'absolute',
    alignItems:'center',
    backgroundColor: 'red',
    overflow: 'hidden'
  },
  bottom: {
    flexDirection: 'row',
    alignItems:'center',
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'blue',
    overflow: 'hidden'
  }
});

AppRegistry.registerComponent('StickyMenu', () => StickyMenu);

module.exports = StickyMenu;
