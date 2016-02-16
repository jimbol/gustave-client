'use strict';

import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({

  backgroundImage: {
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider:{
    height: 1,
    backgroundColor: '#ddd',
    marginRight: 16,
    marginLeft: 16,
  },

  title: {
    flex: 1,
    fontSize: 26,
    color: '#111',
    padding: 16,
  },

  chipContainer: {
    padding: 16,
    height: 220,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});
