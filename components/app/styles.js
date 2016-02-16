'use strict';

import React, {StyleSheet} from 'react-native';

export var create = function(dimensions) {
  return StyleSheet.create({
    scene: {
      width: dimensions.width,
      height: dimensions.height - 20,
      backgroundColor: '#cccccc',
      marginTop: 20,
    },
  });
}
