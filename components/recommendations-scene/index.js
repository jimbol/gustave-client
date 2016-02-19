'use strict';

import React, {Component, View, Text} from 'react-native';
import styles from './styles';
import Recommendation from '../recommendation';
import Button from '../button';

export default class RecommendationsScene extends Component {

  state = {
    index: 2
  };

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

  render() {
    let recommendation = this.getCurrentRecommendation();

    return (
      <View style={[this.props.style, styles.scene]}>
        <Recommendation
          recommendation={recommendation}
          viewDetail={this.viewDetail.bind(this)} />

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
