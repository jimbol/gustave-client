'use strict';

import React, {StyleSheet} from 'react-native';

let OVERLAY_COLOR = 'rgba(98,12,59,.25)'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  backgroundImage: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  eventName: {
    backgroundColor: OVERLAY_COLOR,
    fontSize: 32,
    color: '#fff',
    fontWeight: '400',

    paddingHorizontal: 16,
  },

  location: {
    backgroundColor: OVERLAY_COLOR,
    fontWeight: '500',
    fontSize: 32,
    color: '#fff',

    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  overlay: {
    flex: 1,
    backgroundColor: OVERLAY_COLOR
  },

  infoButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#fff',
    position: 'absolute',
    top: 16,
    right: 8,
    opacity: .85,
  },
});
