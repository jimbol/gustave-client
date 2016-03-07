'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#fff',
    // Shadow won't work with overflow hidden, which is required for jumbotron image corners to match card corner
    overflow: 'hidden'
  },

});
