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

class Gustave extends Component {
  constructor() {
    super()
  }


  render() {


    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            style={styles.backgroundImage}
            source={require('./assets/Mustache.jpg')}
          />
          <Text style={styles.title}>
            Comedy night at Cafe Mustache
          </Text>
          <View style={styles.divider} />


          <View style={styles.chipContainer}>
            <View style={[styles.chip, styles.chipWithImage]}>
              <Text style={styles.chipStar}>
                &#9733;
              </Text>
              <Text style={styles.chipText}>
                Comedy
              </Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>
                Kitchy
              </Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>
                Dive Bar
              </Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>
                Cheap Drinks
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('gustave', () => Gustave);
