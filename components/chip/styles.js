'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({

  chip: {
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 12,
    marginBottom: 12,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f3f3',
    overflow: 'hidden',
  },

  chipWithImage: {
    paddingLeft: 8,
  },

  chipStar: {
    top: -8,
    left: -8,
    height: 32,
    width: 32,
    padding: 2,
    paddingLeft: 3,
    borderRadius: 15,
    backgroundColor: '#ffcc00',
    fontSize: 26,
    color: '#fff0b3',
  },

  chipText: {
    lineHeight: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'rgba(0,0,0,0)',
  },

});
