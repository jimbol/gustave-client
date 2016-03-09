'use strict';

import React, {StyleSheet} from 'react-native';

let OVERLAY_COLOR = 'rgba(0, 0, 0, 0.75)'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  flexFull: {
    flex: 1,
  },

  flexNone: {
    flex: 0,
  },

  backgroundImage: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  title: {
    backgroundColor: OVERLAY_COLOR,
    fontSize: 10,
    color: '#ddd',
    fontWeight: '400',
    marginHorizontal: 8,
    alignSelf: 'flex-start',
  },

  overlay: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    right: 0,
  },

  topButtonIcon: {
    color: '#fff',
    padding: 5,
  },
});
