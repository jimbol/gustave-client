'use strict';
import React, {
  AppRegistry,
  Animated,
  Component,
  PanResponder,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import Dimensions from 'Dimensions';
import styles from './styles.js';
import Button from './components/button';
import Chip from './components/chip';
import Card from './components/card';

class Gustave extends Component {
  constructor() {
    super()
  }


  render() {


    return (
      <View style={styles.container}>
        <Card>
          <Image
            style={styles.backgroundImage}
            source={require('./assets/Mustache.jpg')}
          />

          <Text style={styles.title}>
            Comedy night at Cafe Mustache
          </Text>

          <View style={styles.divider} />


          <View style={styles.chipContainer}>

            <Chip icon='star'>Comedy</Chip>
            <Chip>Kitchy</Chip>
            <Chip>Dive Bar</Chip>
            <Chip>Cheap Drinks</Chip>
            <Chip icon='star'>Records</Chip>
            <Chip>Coffee</Chip>

          </View>

          <Button>I'M DOWN</Button>


        </Card>
      </View>
    );
            // <Text style={styles.button}>
            //   I'M DOWN
            // </Text>
  }
}

AppRegistry.registerComponent('gustave', () => Gustave);
