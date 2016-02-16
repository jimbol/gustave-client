'use strict';

import React, {Component, View, Text, Image} from 'react-native';
import styles from './styles';
import _ from 'lodash';

import Card from '../card';
import Chip from '../chip';
import Button from '../button';

export default class Recommendation extends Component {
  render() {
    let labels = _.union(this.props.rec.event.labels, this.props.rec.event.place.labels);

    return (
      <Card>

        <Image
          style={styles.backgroundImage}
          source={{uri: this.props.rec.event.place.photo.uri}}>

          <Button onPress={this.props.onToggleDetail}>
            More Deets
          </Button>

        </Image>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {this.props.rec.event.name + ' @ \n' + this.props.rec.event.place.name}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.chipContainer}>
          {labels.map(tag => <Chip key={tag}>{tag}</Chip>)}
        </View>

      </Card>
    );
  }
}
