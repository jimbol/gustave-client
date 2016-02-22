'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems:'center',
    position: 'absolute',
    overflow: 'hidden'
  },
  left: {
    position: 'absolute',
    alignItems:'center',
    overflow: 'hidden'
  },
  right: {
    right: 0,
    position: 'absolute',
    alignItems:'center',
    overflow: 'hidden'
  },
  bottom: {
    flexDirection: 'row',
    alignItems:'center',
    bottom: 0,
    position: 'absolute',
    overflow: 'hidden'
  }
});

