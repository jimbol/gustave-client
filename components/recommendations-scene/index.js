'use strict';

import React, {Component, View, Text} from 'react-native';
import styles from './styles';

import Button from '../button';
import Card from '../card';
import Swipeable from '../swipeable';
import Recommendation from '../recommendation';


export default class RecommendationsScene extends Component {

  static propTypes = {
    nextRecommendation: React.PropTypes.object,
    saveRecommendation: React.PropTypes.func,
    dismissRecommendation: React.PropTypes.func,
    isLoadingMore: React.PropTypes.bool, // Will prob be replaced with call to this.props.relay.hasOptimisticUpdate
  };

  static defaultProps = {
    nextRecommendations: null,
  };

  state = {
    currentRecommendation: null,
  };

  componentWillMount() {
    this.syncRec();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.currentRecommendation)
      this.syncRec(nextProps);
  }

  didSwipeLeft() {
    this.props.dismissRecommendation(this.state.currentRecommendation.id);
    this.syncRec();
  }

  didSwipeRight() {
    this.props.saveRecommendation(this.state.currentRecommendation.id);
    this.syncRec();
  }

  // Intentional deviation from React pattern b/c we need manual control
  syncRec(nextProps) {
    let props = nextProps || this.props;
    this.setState({currentRecommendation: props.nextRecommendation});
  }

  viewConcierge() {
    this.props.viewConcierge(this.state.currentRecommendation.id);
  }

  render() {
    let currentRecommendation = this.state.currentRecommendation;

    let leftSwipeEdge = <Text style={styles.edgeLabel}>Dismiss</Text>;
    let rightSwipeEdge = <Text style={styles.edgeLabel}>Save</Text>;

    let emptyState = this.props.isLoadingMore ?
      <Text style={styles.emptyText}>Loading recommendations...</Text> :
      <Text style={styles.emptyText}>No recommendations available.</Text> ;

    let swipeableProps = {
      onSwipeRight: this.didSwipeRight.bind(this),
      rightSwipeEdge,
      onSwipeLeft: this.didSwipeLeft.bind(this),
      leftSwipeEdge,
    };

    return (
      !currentRecommendation ?
      /* Empty view */
      <View style={[this.props.style, styles.scene, styles.empty]}>{emptyState}</View> :

      /* Default view */
      <View style={[this.props.style, styles.scene]}>
        <Swipeable {...swipeableProps}>
          <Card key={currentRecommendation.id}>
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
