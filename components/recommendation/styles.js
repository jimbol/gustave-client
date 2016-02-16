'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({

  backgroundImage: {
    flex: 3,
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
    flex: 1,
  },

  title: {
    fontSize: 26,
    color: '#111',
    padding: 16,
    textAlign: 'center',
    textAlignVertical: 'center', 
  },

  chipContainer: {
    padding: 16,
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
});
