'use strict';

import React, {StyleSheet} from 'react-native';
import Theme from '../../themes/default';

export default StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: Theme.gustaveLightPurple,
  },

  scene: {
    flex: 1,
  },

  statusBar: {
    height: 20,
    backgroundColor: Theme.gustavePurple,
  }

});
