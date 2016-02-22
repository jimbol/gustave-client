'use strict';
import React, {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  top: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  left: {
    position: 'absolute',
    alignItems:'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  right: {
    right: 0,
    position: 'absolute',
    alignItems:'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  bottom: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});

