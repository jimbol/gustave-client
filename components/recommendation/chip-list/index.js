'use strict';

import React, {Component, View, Text, Animated} from 'react-native';
import styles from './styles';

import Chip from '../../chip';
import Stagger from '../../stagger';

export default class ChipList extends Component {
  render() {
    if (!this.props.labels.length) return;

    let chips = this.props.labels.map(function(tag){
      return <Chip
        key={tag}>
          {tag}
        </Chip>
    }.bind(this));

    return (
      <View style={styles.chipContainer}>
        <Stagger components={chips} />
      </View>
    );
  }
}
