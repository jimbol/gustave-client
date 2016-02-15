'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  button: {
    backgroundColor: '#33cc33',
    color: '#fff',
    // height: 64,
    // width: 200,
    shadowColor: "#000",
    shadowOpacity: .4,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    borderRadius: 3,
    position: 'absolute',
    bottom: 32,
    right: 16,
    margin: 16,
    fontSize: 14,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    fontWeight: 'bold'
  },
});
