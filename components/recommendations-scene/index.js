'use strict';

import React, {Component, View, Text, Animated} from 'react-native';
import styles from './styles';

import Button from '../button';
import Card from '../card';
import Swipeable from '../swipeable';
import Recommendation from '../recommendation';


export default class RecommendationsScene extends Component {

  static propTypes = {
    requestMore: React.PropTypes.func,
    isLoadingMore: React.PropTypes.bool,
  };

  componentWillMount() {
    this.setFirstAsCurrent()
  }

  componentWillReceiveProps(nextProps) {
    if (Boolean(nextProps.recommendations))
      this.setState({recommendation: nextProps.recommendations[0]});
  }

  didSwipeLeft() {
    this.nextRec();
  }

  didSwipeRight() {
    this.props.saveRecommendation(this.state.recommendation);
    this.nextRec();
  }

  nextRec() {
    this.props.recommendations.shift();

    if (!this.props.recommendations.length) {
      this.props.requestMore();
    } else {
      this.setFirstAsCurrent()
    }
  }

  setFirstAsCurrent() {
    if(Boolean(this.props.recommendations))
      this.setState({recommendation: this.props.recommendations[0]});
  }

  viewConcierge(){
    this.props.viewConcierge(this.state.recommendation);
  }

  render() {
    let currentRecommendation = this.state.recommendation;

    let leftEdge = <Text style={styles.edgeLabel}>Dismiss</Text>;
    let rightEdge = <Text style={styles.edgeLabel}>Save</Text>;

    if (!currentRecommendation) {
      return (
        <View style={[this.props.style, styles.scene]}>
          { (this.props.isLoadingMore) ?
            <Text>Loading More...</Text>
            :
            <Text>You are shit out of luck.</Text>
          }
        </View>
      );
    }

    return (
      <View style={[this.props.style, styles.scene]}>

        <Swipeable
          onSwipeRight={this.didSwipeRight.bind(this)}
          rightSwipeEdge={rightEdge}
          onSwipeLeft={this.didSwipeLeft.bind(this)}
          leftSwipeEdge={leftEdge} >

          <Card key={currentRecommendation.id} >
              <Recommendation recommendation={currentRecommendation} />
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
