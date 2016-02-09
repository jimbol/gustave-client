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
import styles from './styles.js';
import StickyMenu from './components/sticky-menu/';

class Gustave extends Component {
  constructor() {
    super()

    var windowDimensions = Dimensions.get('window');

    this.state = {
      height: windowDimensions.height,
      width: windowDimensions.width,

      opacity: new Animated.Value(1),

      x: new Animated.Value(0),
      y: new Animated.Value(0),

      top: new Animated.Value(0),
      bottom: new Animated.Value(0),
      right: new Animated.Value(0),
      left: new Animated.Value(0),
    };
  }

  _panResponder = {};
  _passingFn = (evt, gestureState) => true;
  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder:this._passingFn,
      onStartShouldSetPanResponderCapture:this._passingFn,
      onMoveShouldSetPanResponder:this._passingFn,
      onMoveShouldSetPanResponderCapture:this._passingFn,

      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderMove: (evt, gestureState) => this.onPanResponderMove(evt, gestureState),
      onPanResponderTerminationRequest:this._passingFn,
      onPanResponderRelease: (evt, gestureState) => this.onPanResponderRelease(evt, gestureState),
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder:this._passingFn
    });
  }

  onPanResponderMove(evt, gestureState) {
    if(this.offScreen){
      return;
    }

    this.state.opacity.setValue(1);

    var xRatio = Math.abs(gestureState.dx) / this.state.width;
    var yRatio = Math.abs(gestureState.dy) / this.state.height;

    var x = 0;
    var y = 0;

    if (xRatio >= yRatio) {
      x = gestureState.dx
      y = 0
    } else if (xRatio < yRatio) {
      x = 0
      y = gestureState.dy
    }

    this.state.top.setValue((y > 0) ? y : 0);
    this.state.bottom.setValue((y < 0) ? Math.abs(y) : 0);
    this.state.right.setValue((x < 0) ? Math.abs(x) : 0);
    this.state.left.setValue((x > 0) ? x : 0);

    this.state.x.setValue(x);
    this.state.y.setValue(y);
  }

  offScreen = false;

  getGestureDetails(gestureState) {
    var vx = gestureState.vx;
    var vy = gestureState.vy;

    var absvx = Math.abs(vx);
    var absvy = Math.abs(vy);

    if (absvx > 1 || absvy > 1){

      if(absvx > absvy) {
        var axis = 'x';
        var offset = this.state.width + 10;
        var direction = 'left';

        if(vx < 0){
          var offset = -offset;
          direction = 'right';
        }

      } else {
        var axis = 'y';
        var offset = this.state.height;
        var direction = 'top';

        if(vy < 0){
          var offset = -offset;
          direction = 'bottom';
        }
      }

      return {
        axis: axis,
        direction: direction,
        offset: offset
      }
    }
  }

  onPanResponderRelease(evt, gestureState) {
    if(this.offScreen){
      return;
    }

    var gestureDetails = this.getGestureDetails(gestureState)

    if (gestureDetails){
      this.carryCardAway(gestureDetails)
      this.offScreen = true
    }

    if(this.offScreen){
      return;
    }

    this.resetMenus();
    this.resetCard()
  }

  carryCardAway(gestureDetails){
    var axis = gestureDetails.axis;
    var offset = gestureDetails.offset;
    var direction = gestureDetails.direction;

    Animated.parallel([
      Animated.timing(this.state[axis], {
        toValue: offset,
        duration: 100
      }),
      Animated.timing(this.state[direction], {
        toValue: (axis === 'x') ? this.state.width : this.state.height,
        duration: 100
      }),
    ]).start(() => this.resetEnd());
  }

  resetEnd(){
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(this.state.x, {
          toValue: 0,
          duration: 200
        }),
        Animated.timing(this.state.y, {
          toValue: 0,
          duration: 200
        }),
      ])
    ]).start(() => this.offScreen = false);
  }

  resetCard(){
    Animated.parallel([
      Animated.timing(this.state.x, {
        toValue: 0,
        duration: 200
      }),
      Animated.timing(this.state.y, {
        toValue: 0,
        duration: 200
      }),
    ]).start(() => this.offScreen = false);
  }

  resetMenus(){
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 200
      }),
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 200
      }),
      Animated.timing(this.state.bottom, {
        toValue: 0,
        duration: 200
      }),
      Animated.timing(this.state.right, {
        toValue: 0,
        duration: 200
      }),
      Animated.timing(this.state.left, {
        toValue: 0,
        duration: 200
      }),
    ]).start();
  }

  fullHeight() {
    return {
      height: this.state.height
    }
  }

  fullWidth() {
    return {
      width: this.state.width
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

  render() {
    return (
      <View style={[styles.container, this.fullHeight(), this.fullWidth()]} {...this._panResponder.panHandlers}>


        <StickyMenu edge="top" change={this.state.top}>
          Menu
        </StickyMenu>
        <StickyMenu edge="left" change={this.state.left}>
          Yea!
        </StickyMenu>
        <StickyMenu edge="right" change={this.state.right}>
          Nah.
        </StickyMenu>
        <StickyMenu edge="bottom" change={this.state.bottom}>
          Maybe later.
        </StickyMenu>

        <View style={styles.cardContainer}>


          <Animated.View style={[styles.card, this.getCardStyles(), this.fullHeight(), this.fullWidth()]}>
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

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    marginTop: 20,
  },
  label: {
    flex: 1,
    textAlign:'center',
    color: 'white',
    fontSize: 24,
    width: 300
  },

  // Stickies
  stickyTop: {
    flexDirection: 'row',
    alignItems:'center',
    position: 'absolute',
    backgroundColor: 'gray',
    overflow: 'hidden'
  },
  stickyLeft: {
    position: 'absolute',
    alignItems:'center',
    backgroundColor: 'green',
    overflow: 'hidden'
  },
  stickyRight: {
    right: 0,
    position: 'absolute',
    alignItems:'center',
    backgroundColor: 'red',
    overflow: 'hidden'
  },
  stickyBottom: {
    flexDirection: 'row',
    alignItems:'center',
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'blue',
    overflow: 'hidden'
  },

  // Card shit
  cardContainer: {
    flexDirection:'row'
  },
  card: {
    position: 'absolute',
    backgroundColor: '#EEE',
  },
  title: {
    fontSize: 60,
    padding: 20,
    backgroundColor: '#8c0d26',
    color: '#DDD'

  },
  subTitle: {
    padding: 20,
    fontSize: 20,
    textAlign: 'left',
  },
  text: {
    padding: 20,
    paddingTop: 0,
    fontSize: 12,
    textAlign: 'left',
    color: '#333'
  },
});

AppRegistry.registerComponent('gustave', () => Gustave);
