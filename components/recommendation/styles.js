'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 0.60,
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
    flex: 0,
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

  preview: {
    fontSize: 12,
    color: '#ccc',
    paddingTop: 8
  },

  chipContainer: {
    flex: 0.40,
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
