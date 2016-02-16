'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({

  chip: {
    flexDirection: 'row', 
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    marginBottom: 6,
    borderRadius: 16,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chipWithImage: {
    paddingLeft: 8,
  },

  chipIcon: {
    padding: 9,
    margin: -9,
    marginRight: 2,
    borderRadius: 25,
    backgroundColor: '#ffcc00',
  },

  chipIconText: {
    color: '#fff0b3',
  },

  chipText: {
    lineHeight: 16,
    fontSize: 16,
    color: '#111',
  },

});
