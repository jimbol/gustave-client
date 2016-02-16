'use strict';
import React, {
  AppRegistry,
  Animated,
  Component,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import _ from 'lodash';

import styles from '../../styles.js';
import Chip from '../chip';
import Card from '../card';

class FrontCard extends Component {

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <Card ref={component => this._root = component}>
        <Image
          style={styles.backgroundImage}
          source={{uri: this.props.rec.event.place.photo.uri}}
        />

        <Text style={styles.title}>
          {this.props.rec.event.name} @ {this.props.rec.event.place.name}
        </Text>

        <View style={styles.divider} />

        <View style={styles.chipContainer}>
          {/* Render unique topic tags from both even and place */}
          {_.union(this.props.rec.event.labels, this.props.rec.event.place.labels).map(tag =>
            <Chip key={tag}>{tag}</Chip>
          )}
        </View>

      </Card>
    );
  }
}

class BackCard extends Component {

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <Card ref={component => this._root = component}>
        <Text style={styles.title}>
          {this.props.rec.event.name} @ {this.props.rec.event.place.name}
        </Text>

        <View style={styles.divider} />

        <Text>
          {this.props.rec.event.name}
        </Text>
        <Text>
          {this.props.rec.event.description}
        </Text>

        <View style={styles.chipContainer}>
          {/* Render unique topic tags from both even and place */}
          {this.props.rec.event.labels.map(tag =>
            <Chip key={tag}>{tag}</Chip>
          )}
        </View>

        <View style={styles.divider} />

        <Text>
          {this.props.rec.event.place.name}
        </Text>
        <Text>
          {this.props.rec.event.place.address}
        </Text>
        <Text>
          {this.props.rec.event.place.description}
        </Text>

        <View style={styles.chipContainer}>
          {/* Render unique topic tags from both even and place */}
          {this.props.rec.event.place.labels.map(tag =>
            <Chip key={tag}>{tag}</Chip>
          )}
        </View>

      </Card>
    );
  }
}

export default class FlipCard extends Component {
  state = {
    flipped: false
  }

  flip() {
    this.setState({flipped: !this.state.flipped});
  }

  render() {
    let cardFace;

    if(!this.state.flipped) {
      cardFace = <FrontCard {...this.props}/>;
    } else {
      cardFace = <BackCard {...this.props}/>;

    }

    return (
      <TouchableHighlight onPress={this.flip.bind(this)}>
        {cardFace}
      </TouchableHighlight>
    );
  }
}
