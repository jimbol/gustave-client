'use strict';

import React, {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
  },

  backgroundImage: {
    flex: 0.10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(83, 70, 80, 0.75)',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    padding: 16,
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
