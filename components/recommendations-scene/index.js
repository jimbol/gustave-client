'use strict';

import React, {Component, View, Text, Animated} from 'react-native';
import styles from './styles';
import Recommendation from '../recommendation';
import Button from '../button';
import TouchResponder from '../touch-responder';
import Edge from '../pull-menu/edge';

export default class RecommendationsScene extends Component {

  state = {
    index: 2
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
      },
    });

    return touchResponder;
  }

  returnToOrigin() {
    Animated.spring(this.state.distance, {
      toValue: 0,
      duration: 750
    }).start();
  }

  cardTransform(){
    return {
      transform: [
        {translateX: (this.state.axis === 'x') ? this.state.distance : 0},
        {translateY: (this.state.axis === 'y') ? this.state.distance : 0},
      ]
    }
  }

  render() {
    let recommendation = this.getCurrentRecommendation();

    return (
      <View style={[this.props.style, styles.scene]} {...this.touchResponder.panHandlers}>
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
