'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    margin: 8,
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOpacity: .4,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    borderRadius: 2,
    borderWidth: 0,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    overflow: 'hidden',
    flex: 1
  },

  cardLandscape: {
    flexDirection: 'row',
  }
});
