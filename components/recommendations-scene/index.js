'use strict';

import React, {Component, StyleSheet, ScrollView, View, Text} from 'react-native';

import Button from '../button';
import Card from '../card';
import Swipeable from '../swipeable';
// import Recommendation from '../recommendation';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class RecommendationsScene extends Component {

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  static propTypes = {
    nextRecommendation: React.PropTypes.object,
    saveRecommendation: React.PropTypes.func.isRequired,
    dismissRecommendation: React.PropTypes.func.isRequired,
    isLoadingMore: React.PropTypes.bool, // Will prob be replaced with call to this.props.relay.hasOptimisticUpdate
  };

  static defaultProps = {
    nextRecommendations: null,
  };

  state = {
    currentRecommendation: null,
    hasOverflow: false,
  };

  attributes = {
    height: 0,
    childHeight: 0,
  };

  handleLayout(event) {
    this.attributes.height = event.nativeEvent.layout.height;
    this.checkOverflow();
  }

  handleChildLayout(event) {
    this.attributes.childHeight = event.nativeEvent.layout.height;
    this.checkOverflow();
  }

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

  checkOverflow() {
    if (this.attributes.childHeight > this.attributes.height)
      this.setState({hasOverflow: true});
    else
      this.setState({hasOverflow: false});
  }

  render() {
    let currentRecommendation = this.state.currentRecommendation;

    let leftSwipeEdge = <Icon name="not-interested" style={[styles.edgeLabel, this.context.theme.negativeAction]} />;
    let rightSwipeEdge = <Icon name="favorite" style={[styles.edgeLabel, this.context.theme.positiveAction]} />;

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
      <View style={[styles.flexFull, styles.empty]}>{emptyState}</View> :

      /* Default view */
      <Swipeable 
          onLayout={this.handleLayout.bind(this)} 
          style={[styles.flexFull, this.props.style]}
          {...swipeableProps} >

        <ScrollView scrollEnabled={this.state.hasOverflow} contentContainerStyle={!this.state.hasOverflow && styles.flexFull}>
          <Card key={currentRecommendation.id} style={!this.state.hasOverflow && styles.flexFull}>
            <Recommendation onLayout={this.handleChildLayout.bind(this)} recommendation={currentRecommendation} />
          </Card>
        </ScrollView>

      </Swipeable>

    );
  }
}

class Recommendation extends React.Component {
  render() {
    return (
      <View onLayout={this.props.onLayout} style={{height: 100}}>
        <Text>Test</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  flexFull: {
    flex: 1,
  },

  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    color: '#fff',
    textAlign: 'center',
  },

  edgeLabel: {
    fontSize: 96,
    fontWeight: '900',
    textAlign: 'center'
  },
});
