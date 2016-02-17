'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({

  backgroundImage: {
    flex: 0.5,
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
    flex: 0.15,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    overflow: 'hidden',
  },

  title: {
    fontSize: 22,
    color: '#111',
    textAlign: 'left',
  },

  chipContainer: {
    flex: 0.35,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 8,
    overflow: 'hidden',
  },

  chip: {
    backgroundColor: '#620c3b',
  },

  chipText: {
    color: '#e3e4d9',
  },
});
