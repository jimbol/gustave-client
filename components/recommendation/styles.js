'use strict';

import React, {StyleSheet} from 'react-native';

let OVERLAY_COLOR = 'rgba(0, 0, 0, .5)'

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
    color: '#fff',
    fontWeight: '400',
    marginHorizontal: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },

  overlay: {
    // flex: 1,
    // backgroundColor: OVERLAY_COLOR,
  },

  infoButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#fff',
    // position: 'absolute',
    // top: 16,
    // right: 8,
    opacity: .85,
  },
});
