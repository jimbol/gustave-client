'use strict';

import React, {Component, View, Text} from 'react-native';
import styles from './styles';

import Button from '../button';
import Recommendation from '../recommendation';
import Swipeable from '../swipeable';
import Card from '../card';

import Icon from 'react-native-vector-icons/MaterialIcons';


export default class RecommendationScene extends Component {

  static propTypes = {
    goBack: React.PropTypes.func.isRequired,
  };

  state = {
    cleared: false,
  };

  didSwipeLeft() {
    this.props.goBack();
    this.setState({cleared: true});
  }

  render() {
    let recommendation = this.props.recommendation;

    let leftSwipeEdge = <Icon name="arrow-back" style={[styles.edgeLabel, styles.notInterested]} />;

    let swipeableProps = {
      onSwipeLeft: this.didSwipeLeft.bind(this),
      leftSwipeEdge,
    };

    return (
      <View style={[this.props.style, styles.scene]}>
        <Swipeable {...swipeableProps}>
          {!this.state.cleared ?
          <Card key={recommendation.id}>
            <Recommendation recommendation={recommendation} />
          </Card>
          :
          null}
        </Swipeable>
      </View>
    );
  }
}
