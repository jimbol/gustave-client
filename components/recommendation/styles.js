'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  backgroundImage: {
    flex: 0.50,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
    marginRight: 16,
    marginLeft: 16,
  },

  eventName: {
    backgroundColor: 'rgba(98,12,59,.25)',
    fontSize: 28,
    color: '#fff',
    fontWeight: '400',

    paddingHorizontal: 16,
  },

  location: {
    backgroundColor: 'rgba(98,12,59,.25)',
    fontWeight: '500',
    fontSize: 36,
    textAlign: 'left',
    color: '#fff',

    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  description: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: 16,
    overflow: 'hidden',
  },

  fader: {
    flex: 1,
    backgroundColor: 'rgba(98,12,59,.25)'
  },

  info: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#fff',
    position: 'absolute',
    top: 16,
    right: 16,
    opacity: .85,
  },

  preview: {
    fontSize: 14,
    color: '#666',
    paddingTop: 8
  },

  chipContainer: {
    flex: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
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
