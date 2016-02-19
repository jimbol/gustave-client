'use strict';

import React, {Component, View, Text, Image} from 'react-native';
import styles from './styles';

export default class FavoritesScene extends Component {
  render() {
    return (
      <View style={[this.props.style, styles.scene]}>
        <Text>Favorites</Text>
        <Text>Favorites</Text>
        <Text>Favorites</Text>
        <Text>Favorites</Text>
        <Text>Favorites</Text>
        <Text>Favorites</Text>
        <Text>Favorites</Text>
        <Text>Favorites</Text>
        <Text>Favorites</Text>
        <Text>Favorites</Text>
      </View>
    );
  }
}
