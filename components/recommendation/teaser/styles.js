'use strict';

import React, {StyleSheet} from 'react-native';

let OVERLAY_COLOR = 'rgba(98,12,59,.25)'

export default StyleSheet.create({

  container: {
    flex: 1,
    margin: 16,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
  },

  preview: {
    fontSize: 14,
    color: '#666',
    paddingVertical: 16,
  },
});
