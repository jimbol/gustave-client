'use strict';

import React, {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../themes/default';

export default StyleSheet.create({
  scene: {
    flex: 1,
  },

  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    color: '#fff',
    textAlign: 'center',
  },

  edgeLabel: {
    fontSize: 96,
    fontWeight: '900',
    padding: 10,
    width: Dimensions.get('window').width,
    textAlign: 'center'
  },

  notInterested: {
    color: Theme.notInterested,
  },

  interested: {
    color: Theme.interested,
  },
});
