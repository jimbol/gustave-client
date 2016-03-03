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
    marginBottom: 16,
  },

  description: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    overflow: 'hidden',
  },

  // Detail View styles
  descIcon: {
    color: '#aaa',
    width: 22,
  },

  row: {
    flexDirection: 'row',
  },

  rowContent: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
