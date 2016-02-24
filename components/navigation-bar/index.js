'use strict';

import React, {
  Component,
  Text,
  TouchableOpacity,
  View,
  Navigator,
  StatusBar,
} from 'react-native';

import styles from './styles';

export var NavigationBarStyles = styles;

export var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    let onPressBack = function(){
      navigator.pop();
    }

    return (
      <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
        <Text style={styles.backText}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  Title(route, navigator, index, navState) {
    return (
      <Text style={styles.titleText}>
        {route.name}
      </Text>
    );
  },

  RightButton(route, navigator, index, navState) {
    let isSavedRoute = route.id === 'saved';
    let savedIconOpacity = isSavedRoute ? 1 : undefined;

    let onPressSaved = function(){
      if(isSavedRoute) {
        return;
      }

      navigator.push({
        id: 'saved',
        name: 'Saved',
      });
    }

    let onPressMenu = function() {
      console.log('noop');
    }

    return (
      <View style={styles.rightAreaContainer}>
        <TouchableOpacity onPress={onPressSaved.bind(this)} style={styles.savedButton} activeOpacity={savedIconOpacity}>
          <Text style={styles.savedText}>
            {'\u2605'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressMenu.bind(this)} style={styles.menuButton}>
          <Text style={styles.menuText}>
            Cog
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
};
