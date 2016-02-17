'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
  },

  map: {
    flex: 0.30,
    margin: 16,
    borderWidth: 1,
    borderColor: '#000000',
  },

  other: {
    flex: 0.70,
    margin: 16,
  },

  backButton: {
    alignSelf: 'flex-start',
  },
});
