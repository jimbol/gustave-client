'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#3399ff',
    height: 680,
  },
  card: {
    margin: 16,
    marginTop: 36,
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOpacity: .75,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0
    },
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  divider:{
    height: 1,
    backgroundColor: '#ddd',
    marginRight: 16,
    marginLeft: 16,
  },

  backgroundImage: {
    flex: 1,
    height: 200,
    width: 341,
  },


  title: {
    flex: 1,
    fontSize: 26,
    color: '#111',
    padding: 16,
  },

  chipContainer: {
    padding: 16,

    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  chip: {
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 12,
    marginBottom: 12,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f3f3',
    overflow: 'hidden',
  },

  chipWithImage: {
    paddingLeft: 8,
  },

  chipStar: {
    top: -8,
    left: -8,
    height: 32,
    width: 32,
    padding: 2,
    paddingLeft: 3,
    borderRadius: 15,
    backgroundColor: '#ffcc00',
    fontSize: 26,
    color: '#fff0b3',
  },

  chipText: {
    lineHeight: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
