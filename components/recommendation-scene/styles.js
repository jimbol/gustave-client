'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#fff',
  },

  commitButton: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    backgroundColor: '#4a0b49',
    borderRadius: 50,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 56,
    height: 56,
    shadowOffset: {
      height: 4,
      width: 0
    },
    shadowOpacity: .4,
    shadowRadius: 3,
  },

  commitButtonText: {
    fontSize: 18,
  }
});
