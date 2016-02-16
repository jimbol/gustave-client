'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
  },
  text: {
    backgroundColor: '#33cc33',
    borderRadius: 3,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: .4,
    shadowRadius: 2,
  },
});
