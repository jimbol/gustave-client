'use strict';

import React, {Component, View, Text, Animated} from 'react-native';
import styles from './styles';
import Recommendation from '../recommendation';
import Button from '../button';
import TouchResponder from '../touch-responder';
import Edge from '../edge';

export default class RecommendationsScene extends Component {

  state = {
    index: 2,
    axis: 'y',
    distance: new Animated.Value(0),
    thickness: new Animated.Value(0),
  };

  constructor(){
    super();
    this.touchResponder = this.createTouchResponder()
  }

  nextRec() {
    this.setState({index: this.getNextIndex()});
  }

  getNextIndex() {
    if (this.state.index >= this.props.recommendations.length - 1){
      return 0;
    } else {
      return this.state.index + 1;
    }
  }

  viewDetail(){
    this.props.viewDetail(this.getCurrentRecommendation());
  }

  viewConcierge(){
    this.props.viewConcierge(this.getCurrentRecommendation());
  }

  getCurrentRecommendation(){
    return this.props.recommendations[this.state.index];
  }

  // Touchable
  createTouchResponder(){
    var _this = this;
    var touchResponder = new TouchResponder({
      onSwipeRelease: function(){ _this.returnToOrigin() },
      onDragRelease: function(){ _this.returnToOrigin() },
      onMove: function(evt, gestureState, touchState){

        _this.setState({
          axis: touchState.axis,
        });

        _this.state.distance.setValue(touchState.distance)
        _this.state.thickness.setValue(Math.abs(touchState.distance));
      },
    });

    return touchResponder;
  }

  returnToOrigin() {
    Animated.spring(this.state.distance, {
      toValue: 0,
      duration: 750
    }).start();

    Animated.spring(this.state.thickness, {
      toValue: 0,
      duration: 750
    }).start();
  };

  cardTransform(){
    return {
      transform: [
        {translateX: (this.state.axis === 'x') ? this.state.distance : 0},
        {translateY: (this.state.axis === 'y') ? this.state.distance : 0},
      ]
    }
  }

  getEdgePosition(){
    if(this.state.axis === 'y') {
      return (this.state.distance > 0) ? 'top' : 'bottom'
    } else {
      return (this.state.distance > 0) ? 'left' : 'right'
    }
  }

  render() {
    let recommendation = this.getCurrentRecommendation();

    var position = this.getEdgePosition();

    return (
      <View style={[this.props.style, styles.scene]} {...this.touchResponder.panHandlers}>

        <Edge
          containerWidth={420}
          position={'top'}
          thickness={this.state.thickness}>
          <Text style={{padding: 10, color: '#fff'}}>
            You found the secret message!
          </Text>
        </Edge>

        <Animated.View style={this.cardTransform()}>
          <Recommendation
            recommendation={recommendation}
            viewDetail={this.viewDetail.bind(this)} />
        </Animated.View>

        <Button
          buttonStyle={styles.commitButton}
          buttonTextStyle={styles.commitButtonText}
          onPress={this.viewConcierge.bind(this)}>
          G!
        </Button>
      </View>
    );
  }


}
