'use strict';

import React, {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../../themes/default';

export default StyleSheet.create({
  map: {
    height: 100,
    overflow: 'hidden',
  },

  placeholderContainer: {
    height: 100,
    backgroundColor: '#eee',
  },

  placeholderImage: {
    height: null,
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
    color: Theme.gustavePurple,
    backgroundColor: 'rgba(0,0,0,0)'
  },
});
