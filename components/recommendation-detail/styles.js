'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({

  backgroundImage: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
    marginRight: 16,
    marginLeft: 16,
  },

  titleContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    alignSelf: 'center',
  },

  title: {
    fontSize: 18,
    color: '#fff',
    padding: 16,
    textAlign: 'center',
  },

  detail: {
    flex: 2,
    padding: 16,
  },

  subtitle: {
    fontSize: 16,
    color: '#111',
    paddingBottom: 8,
  },

  chipContainer: {
    paddingTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },

  chip: {
    backgroundColor: '#620c3b',
  },

  chipText: {
    color: '#e3e4d9',
    fontSize: 12,
    lineHeight: 12,
  },
});
