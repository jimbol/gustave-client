'use strict';

import React, {Component, View, Text, Animated} from 'react-native';
import styles from './styles';

import Button from '../button';
import Card from '../card';
import Swipeable from '../swipeable';
import Recommendation from '../recommendation';


export default class RecommendationsScene extends Component {

  static propTypes = {
    recommendations: React.PropTypes.arrayOf(React.PropTypes.object),
    requestMore: React.PropTypes.func,
    saveRecommendation: React.PropTypes.func,
    dismissRecommendation: React.PropTypes.func,
    isLoadingMore: React.PropTypes.bool,
  };

  static defaultProps = {
    recommendations: [],
  };

  state = {
    recommendation: null,
  };

  componentWillMount() {
    this.syncRec();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.recommendation && Boolean(nextProps.recommendations)) 
      this.syncRec(nextProps);
  }

  didSwipeLeft() {
    this.props.dismissRecommendation(this.state.recommendation);
    this.syncRec();
  }

  didSwipeRight() {
    this.props.saveRecommendation(this.state.recommendation);
    this.syncRec();
  }

  // Intentional deviation from React pattern b/c we need manual control 
  syncRec(nextProps) {
    let props = nextProps || this.props;

    this.setState({recommendation: props.recommendations[0]});

    // if(!this.props.recommendations.length)
    //   this.props.requestMore();
  }

  viewConcierge(){
    this.props.viewConcierge(this.state.recommendation);
  }

  render() {
    let currentRecommendation = this.state.recommendation || this.state.testRec;

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
