'use strict';

import React, {Component, View, Text, Animated} from 'react-native';
import styles from './styles';

import Button from '../button';
import Card from '../card';
import Swipeable from '../swipeable';
import Recommendation from '../recommendation';


export default class RecommendationsScene extends Component {

  state = {
    index: 0,
  };

  componentWillReceiveProps(nextProps) {
    // We can use this for any prep work when recommendations change

    /* From FB:
      Invoked when a component is receiving new props. This method is not called for the 
      initial render.

      Use this as an opportunity to react to a prop transition before render() is called by 
      updating the state using this.setState(). The old props can be accessed via this.props. 
      Calling this.setState() within this function will not trigger an additional render.
    */
  }

  shouldComponentUpdate(nextProps, nextState) {
    // We can use this to prevent a rerender until the next swipe when we receive new props

    /* From FB:
      Invoked before rendering when new props or state are being received. This method is 
      not called for the initial render or when forceUpdate is used.

      If shouldComponentUpdate returns false, then render() will be completely skipped 
      until the next state change. In addition, componentWillUpdate and componentDidUpdate 
      will not be called.

      By default, shouldComponentUpdate always returns true to prevent subtle bugs when state 
      is mutated in place, but if you are careful to always treat state as immutable and to 
      read only from props and state in render() then you can override shouldComponentUpdate 
      with an implementation that compares the old props and state to their replacements.
    */

    if (nextState !== this.state) {
      return true;
    }

    return false;
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

  viewConcierge(){
    this.props.viewConcierge(this.getCurrentRecommendation());
  }

  getCurrentRecommendation(){
    return this.props.recommendations[this.state.index];
  }

  render() {

    let currentRecommendation = this.getCurrentRecommendation();

    let leftEdge = <Text style={styles.edgeLabel}>Dismiss</Text>;
    let rightEdge = <Text style={styles.edgeLabel}>Save</Text>;

    return (
      <View style={[this.props.style, styles.scene, this.state.isSwiping && {paddingHorizontal: 8}]}>

        <Swipeable ref="swipeParent"
          onSwipeRight={this.nextRec.bind(this)}
          rightSwipeEdge={rightEdge}
          onSwipeLeft={this.nextRec.bind(this)}
          leftSwipeEdge={leftEdge} >

          {/* Setting the key prop on the Card allows React to know that it's a new card
              and not just a change to the internal data. This is what the key prop is for. 
              It's often used for lists, which we do here to make sure that we get the mounting
              animation provided by Card. 
          */}
          <Card key={this.state.index} > 
            <Recommendation
              recommendation={currentRecommendation} />
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
