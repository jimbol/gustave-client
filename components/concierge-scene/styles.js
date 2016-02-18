'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
  },

  backgroundImage: {
    flex: 0.10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    padding: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {
      width: 1, 
      height: 1,
    },
    textShadowRadius: 1,
  },

  map: {
    flex: 0.30,
  },

  other: {
    flex: 0.70,
    margin: 16,
  },

  otherExample: {
    marginVertical: 2,
  },

  backButton: {
    alignSelf: 'flex-start',
  },
});
