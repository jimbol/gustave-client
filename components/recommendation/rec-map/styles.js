'use strict';

import React, {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  map: {
    marginBottom: 16,
    height: 100,
    overflow: 'hidden',
  },

  placeholderContainer: {
    height: 100,
    marginBottom: 16,
    backgroundColor: '#eee',
  },

  placeholderImage: {
    height: 100,
    width: null,
  },

  directionIcon: {
    textAlign: 'right',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: 8,
    color: '#111',
    backgroundColor: 'rgba(0,0,0,0)'
  },

  altDirectionIcon: {
    color: '#fff',
  },
});
