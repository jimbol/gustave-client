'use strict';

import React, {Component, View} from 'react-native';
import styles from './styles';

import Button from '../button';
import Recommendation from '../recommendation';


export default class RecommendationScene extends Component {

  viewConcierge() {
    this.props.viewConcierge(this.props.recommendation);
  }

  render() {
    let recommendation = this.props.recommendation;

    return (
      <View style={[this.props.style, styles.scene]}>

        <Recommendation
          recommendation={recommendation} />

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
