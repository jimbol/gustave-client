'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  card: {
    margin: 16,
    marginTop: 36,
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOpacity: .4,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});
