'use strict';

import React, {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#fff'
  },

  edgeContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: Dimensions.get('window').width,
  },

  edgeLabel: {
    padding: 10,
    textAlign: 'center'
  },

  recommendationContainer: {
    flex: 0,
    flexDirection: 'row',
  },

  recommendationTextContainer: {
    flex: 0.7,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.25)',
  },

  recommendationText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: 8
  },

  recommendationTitle: {
    fontSize: 12,
    color: '#000',
    paddingBottom: 16, 
  },

  recommendationDescription: {
    fontSize: 10,
    color: '#111',
    paddingBottom: 8,
  },

  info: {
    fontSize: 10,
    color: '#ccc',
    paddingBottom: 4
  },

  recommendationImage: {
    width: 100,
    height: 100,
  }

});
