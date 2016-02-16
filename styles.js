'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#3399ff',
    height: 680,
  },

  // sort styles by reusable vs not
  card: {
    margin: 16,
    marginTop: 36,
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOpacity: .4,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
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
    height: 280,
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
    height: 220,


    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});
