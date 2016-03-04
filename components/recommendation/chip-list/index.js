'use strict';

import React, {Component, View, Text} from 'react-native';
import styles from './styles';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

import Chip from '../../chip';

export default class ChipList extends Component {
  render() {
    if (!this.props.labels.length) return;

    return (
      <View style={styles.chipContainer}>
        {this.props.labels.map(tag =>
          <Chip key={tag}>
            {tag}
          </Chip>)
        }
      </View>
    );
  }
}
