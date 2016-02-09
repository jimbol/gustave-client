'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  label: {
    flex: 1,
    textAlign:'center',
    color: 'white',
    fontSize: 24,
    width: 300
  },

  top: {
    flexDirection: 'row',
    alignItems:'center',
    position: 'absolute',
    backgroundColor: 'gray',
    overflow: 'hidden'
  },
  left: {
    position: 'absolute',
    alignItems:'center',
    backgroundColor: 'green',
    overflow: 'hidden'
  },
  right: {
    right: 0,
    position: 'absolute',
    alignItems:'center',
    backgroundColor: 'red',
    overflow: 'hidden'
  },
  bottom: {
    flexDirection: 'row',
    alignItems:'center',
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'blue',
    overflow: 'hidden'
  }
});
