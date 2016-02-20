'use strict';

import React, {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
  },

  titleContainer: {
    flex: 0,
    alignSelf: 'stretch',
    backgroundColor: '#4a0b49',
  },

  title: {
    color: '#93818e',
    paddingBottom: 12,
    textAlign: 'center',
  },

  map: {
    flex: 0.30,
    overflow: 'hidden',
  },

  placeholderContainer: {
    flex: 0.30,
  },

  placeholderImage: {
    flex: 1,
    height: null,
    width: null,
  },

  other: {
    flex: 0.70,
    margin: 16,
  },

  otherExample: {
    marginVertical: 2,
  },

  backButton: {
    alignSelf: 'flex-start',
  },
});
