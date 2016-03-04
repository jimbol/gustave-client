'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#fff',
    // Shadow won't work with overflow hidden, which is required for jumbotron image corners to match card corner
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    overflow: 'hidden'
  },

});
