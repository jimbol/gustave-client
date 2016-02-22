'use strict';

import React, {Component, View, Text, Animated} from 'react-native';
import styles from './styles';

import Button from '../button';
import Card from '../card';
import Swipeable from '../swipeable';
import Recommendation from '../recommendation';
// import DeckNavigator from './deck-navigator';


export default class RecommendationsScene extends Component {

  state = {
    index: 0,
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

  viewConcierge(){
    this.props.viewConcierge(this.getCurrentRecommendation());
  }

  getCurrentRecommendation(){
    return this.props.recommendations[this.state.index];
  }

  render() {
    let recommendation = this.getCurrentRecommendation();

    let leftEdge = <Text style={styles.edgeLabel}>Dismiss</Text>;
    let rightEdge = <Text style={styles.edgeLabel}>Save</Text>;

    return (
      <View style={[this.props.style, styles.scene]}>

        <Swipeable
          onSwipeRight={this.nextRec.bind(this)}
          rightSwipeEdge={rightEdge}
          onSwipeLeft={this.nextRec.bind(this)}
          leftSwipeEdge={leftEdge}>

          <Card>
            <Recommendation
              recommendation={recommendation} />
          </Card>

        </Swipeable>

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
