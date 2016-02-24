'use strict';

import React, {
    Component, 
    View, 
    Text, 
    Animated, 
    PanResponder, 
    Dimensions,
  } from 'react-native';

import styles from './styles';

import Edge from './edge';


const SWIPE_V_THRESHOLD = 1;

const resetToZero = {
  toValue: 0,
  duration: 200
};


export default class Swipeable extends Component {

  static propTypes = {
    onSwipeLeft: React.PropTypes.func,
    onSwipeRight: React.PropTypes.func,
    leftSwipeEdge: React.PropTypes.node,
    rightSwipeEdge: React.PropTypes.node,
    onSwipeStart: React.PropTypes.func,
    onSwipeEnd: React.PropTypes.func,
  };

  state = {
    // Card position offset
    offsetX: new Animated.Value(0),

    // Edge thickness
    left: new Animated.Value(0),
    right: new Animated.Value(0),

    // Height for edges
    edgeHeight: 0,

    // Is currently being swiped
    isSwiping: false,
  };

  componentWillUnmount() {
    this.state.offsetX.removeListener(this._offsetXListener);
  }

  componentWillMount() {

    this._offsetXListener = this.state.offsetX.addListener(({value}) => {
      this.props.rightSwipeEdge && this.state.left.setValue(Math.abs(Math.max(value, 0)));
      this.props.leftSwipeEdge && this.state.right.setValue(Math.abs(Math.min(value, 0)));
    });

    this.panResponder = PanResponder.create({
      // Do not ask to be the responder on touch
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      // Ask to be the responder on move for an implemented swipe direction :
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (Boolean(this.props.onSwipeLeft) && gestureState.dx < 0) || (Boolean(this.props.onSwipeRight) && gestureState.dx > 0);
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return (Boolean(this.props.onSwipeLeft) && gestureState.dx < 0) || (Boolean(this.props.onSwipeRight) && gestureState.dx > 0);
      },

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!
        this.setState({isSwiping: true});
        this.props.onSwipeStart && this.props.onSwipeStart();

        // This ensures that a dragged component stays put
        // We'll override this if we snap back upon release
        this.state.offsetX.stopAnimation((offset) => this.state.offsetX.setOffset(offset));

        // gestureState.{x,y}0 will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}

        this.state.offsetX.setValue(gestureState.dx);
      },
      // Swipe should only give up control upon release
      // Doesn't yet work with ScrollView b/c react-native hasn't implement support for this yet
      // but leave it here so that it works eventually
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        if (this.state.isSwiping) {
          this.setState({isSwiping: false});
          this.props.onSwipeEnd && this.props.onSwipeEnd();
        }

        if (gestureState.vx >= SWIPE_V_THRESHOLD) {
          this.onSwipeRight(evt, gestureState);
        } else if (gestureState.vx <= -SWIPE_V_THRESHOLD) {
          this.onSwipeLeft(evt, gestureState);
        } else {
          this.onRelease(evt, gestureState);
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        if (this.state.isSwiping) {
          this.setState({isSwiping: false});
          this.props.onSwipeEnd && this.props.onSwipeEnd();
        }

        this.onRelease(evt, gestureState);
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  onSwipeLeft(event, gestureState) {
    this.state.offsetX.flattenOffset(); // This makes sure we can reverse our swipe direction
    this.state.offsetX.stopAnimation((offset) => {
      let toValue = -Dimensions.get('window').width;
      let duration = Math.abs(offset) / Math.abs(gestureState.vx);

      Animated.timing(this.state.offsetX, {toValue, duration}).start(() => {
        this.props.onSwipeLeft && this.props.onSwipeLeft();
        this.reset();  
      });        
    });
  }

  onSwipeRight(event, gestureState) {
    this.state.offsetX.flattenOffset(); // This makes sure we can reverse our swipe direction
    this.state.offsetX.stopAnimation((offset) => {
      let toValue = Dimensions.get('window').width;
      let duration = Math.abs(offset) / Math.abs(gestureState.vx);

      Animated.timing(this.state.offsetX, {toValue, duration}).start(() => {
        this.props.onSwipeRight && this.props.onSwipeRight(); 
        this.reset(); 
      });      
    });
  }

  onRelease(event, gestureState) {
    Animated.parallel([
      Animated.spring(this.state.offsetX, resetToZero),
    ]).start();
  }

  reset() {
    this.state.offsetX.setValue(0);
  }

  setEdgeHeight(event) {
    let {x, y, width, height} = event.nativeEvent.layout;
    if (height !== this.state.edgeHeight) {
      this.setState({edgeHeight: height});
    }
  }

  createAnimationStyles() {
    let animationStyles = {
      flex: 1,
      opacity: this.state.isSwiping && 0.8 || 1,
      transform: [
        {translateX: this.state.offsetX},
      ],
    };

    return animationStyles;
  }

  render() {

    return (
      <View onLayout={this.setEdgeHeight.bind(this)} style={styles.container}>

        {this.props.rightSwipeEdge && 
          <Edge
            containerHeight={this.state.edgeHeight} 
            position={'left'}
            thickness={this.state.left}>
            {this.props.rightSwipeEdge}
          </Edge>
        }

        {this.props.leftSwipeEdge && 
          <Edge
            containerHeight={this.state.edgeHeight} 
            position={'right'}
            thickness={this.state.right}>
            {this.props.leftSwipeEdge}
          </Edge>
        }

        <Animated.View style={this.createAnimationStyles()} {...this.panResponder.panHandlers}>
          {this.props.children}
        </Animated.View>

      </View>
    );
  }


}
