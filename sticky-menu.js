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

class StickyMenu extends Component {
  constructor(args) {
    super();
    var windowDimensions = Dimensions.get('window');

    this.state = {
      edge: args.edge, // top, bottom, left, right
      opacity: 1,
      height: windowDimensions.height,
      width: windowDimensions.width,

      top: args.change,
    }
  }

  getStyles() {
    var vert = this.state.edge === 'left' || this.state.edge === 'right';

    var change = this.state.top;

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
