'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({

  chip: {
    flexDirection: 'row', 
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 3,
    marginBottom: 6,
    borderRadius: 16,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chipWithImage: {
    paddingLeft: 8,
  },

  chipIcon: {
    padding: 6,
    margin: -9,
    marginRight: 2,
    borderRadius: 25,
    backgroundColor: '#ffcc00',
  },

  chipIconText: {
    color: '#fff0b3',
    fontSize: 18,
  },

  chipText: {
    fontSize: 12,
    color: '#111',
  },

});
