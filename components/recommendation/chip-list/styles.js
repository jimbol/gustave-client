'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    overflow: 'hidden',
  },

  chip: {
    backgroundColor: '#620c3b',
  },

  chipText: {
    color: '#e3e4d9',
  },
});
