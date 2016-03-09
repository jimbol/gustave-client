'use strict';

import React, {Component, StyleSheet, ScrollView, View, Text, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../button';
import Card from '../card';
import Swipeable from '../swipeable';
import Recommendation from '../recommendation';


export default class RecommendationsScene extends Component {

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  static propTypes = {
    nextRecommendation: React.PropTypes.object,
    saveRecommendation: React.PropTypes.func.isRequired,
    dismissRecommendation: React.PropTypes.func.isRequired,
    onToggleRecommendation: React.PropTypes.func,
    isLoadingMore: React.PropTypes.bool, // Will prob be replaced with call to this.props.relay.hasOptimisticUpdate
  };

  static defaultProps = {
    nextRecommendations: null,
  };

  state = {
    currentRecommendation: null,
    hasOverflow: false,
    isChildDetailed: false,
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

  checkOverflow() {
    if (this.attributes.childHeight > this.attributes.height)
      !this.state.hasOverflow && this.setState({hasOverflow: true});
    else
      this.state.hasOverflow && this.setState({hasOverflow: false});

    this.checkScrollTop();
  }

  handleToggle(nextIsDetailed) {
    if (this.state.isChildDetailed !== nextIsDetailed) 
      this.setState({isChildDetailed: nextIsDetailed});

    this.checkScrollTop();
  }

  checkScrollTop() {
    if (!this.refs.scroll) return; 

    let shouldScroll = this.state.isChildDetailed && this.state.hasOverflow;
    if (!shouldScroll)
      this.scrollToTop(false);
  }

  scrollToTop(doAnimate) {
    if (!this.refs.scroll) return;
    this.refs.scroll.scrollTo({x: 0, y:0, animated: doAnimate || true});
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
    this.setState({currentRecommendation: props.nextRecommendation, hasOverflow: false, isChildDetailed: false});
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

    let shouldScroll = this.state.isChildDetailed && this.state.hasOverflow;

    return (
      !currentRecommendation ?
      /* Empty view */
      <View style={[styles.flexFull, styles.empty]}>{emptyState}</View> :

      /* Default view */
      <View style={[styles.flexFull, this.props.style]}>
        <TouchableWithoutFeedback onPress={this.scrollToTop.bind(this)} >
          <View style={[this.context.theme.headerView]}>
            <Text style={[styles.headingText, this.context.theme.headerText]}>Happening Nearby</Text>
          </View>
        </TouchableWithoutFeedback>
        <Swipeable 
            onLayout={this.handleLayout.bind(this)} 
            style={styles.flexFull}
            {...swipeableProps} >

          <ScrollView ref="scroll"
            scrollEnabled={this.state.hasOverflow} 
            contentContainerStyle={!shouldScroll && styles.flexFull}
            showsVerticalScrollIndicator={false}>

            <Card key={currentRecommendation.id} style={!shouldScroll && styles.flexFull}>
              <Recommendation 
                willToggle={this.handleToggle.bind(this)}
                onLayout={this.handleChildLayout.bind(this)} 
                recommendation={currentRecommendation}
                onToggleRecommendation={this.props.onToggleRecommendation}/>
            </Card>

          </ScrollView>

        </Swipeable>
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

  headingText: {
    opacity: 0.85,
    textAlign: 'center',
    padding: 2.5,
  },

  edgeLabel: {
    fontSize: 96,
    fontWeight: '900',
    textAlign: 'center'
  },
});
