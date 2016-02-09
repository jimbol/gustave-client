'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    marginTop: 20,
  },

  // Card shit
  cardContainer: {
    flexDirection:'row'
  },
  card: {
    position: 'absolute',
    backgroundColor: '#EEE',
  },
  title: {
    fontSize: 60,
    padding: 20,
    backgroundColor: '#8c0d26',
    color: '#DDD'

  },
  subTitle: {
    padding: 20,
    fontSize: 20,
    textAlign: 'left',
  },
  text: {
    padding: 20,
    paddingTop: 0,
    fontSize: 12,
    textAlign: 'left',
    color: '#333'
  },
});
