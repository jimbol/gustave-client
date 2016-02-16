'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({

  backgroundImage: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
    marginRight: 16,
    marginLeft: 16,
  },

  titleContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  title: {
    fontSize: 26,
    color: '#111',
    padding: 16,
    textAlign: 'left',
  },

  chipContainer: {
    padding: 16,
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },

  chip: {
    backgroundColor: '#620c3b',
  },

  chipText: {
    color: '#e3e4d9',
  },
});
