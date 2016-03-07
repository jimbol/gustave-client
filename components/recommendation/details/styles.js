'use strict';

import React, {StyleSheet} from 'react-native';

let OVERLAY_COLOR = 'rgba(98,12,59,.25)'

export default StyleSheet.create({

  container: {
    flex: 1,
    margin: 16,
  },

  description: {
    flex: 1,
    color: '#333',
  },

  // Detail View styles
  descIcon: {
    color: '#aaa',
    width: 22,
  },

  row: {
    flexDirection: 'row',
    paddingBottom: 12,
    flex: 1,
  },

  rowContent: {
    flexWrap: 'wrap',
    flex: 1,
  },
});
