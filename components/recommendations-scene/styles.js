'use strict';

import React, {StyleSheet, Dimensions} from 'react-native';

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
    padding: 10,
    color: '#fff',
    width: Dimensions.get('window').width,
    textAlign: 'center'
  },

});
