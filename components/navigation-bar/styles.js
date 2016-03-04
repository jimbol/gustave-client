'use strict';

import React, {StyleSheet} from 'react-native';
import Theme from '../../themes/default';

export default StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: Theme.gustavePurple,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },

  buttonContainer: {
    flex: 1,
    opacity: 0.6,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'center',
  },

  backButton: {
    alignSelf: 'flex-start',
  },

  heartsButton: {
  },

  menuButton: {
    alignSelf: 'flex-end',
  },

  icon: {
    color: '#fff',
    fontSize: 30,
  },

});
