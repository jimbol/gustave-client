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
    let onPressFavorites = function(){
      navigator.push({
        id: 'favorites',
        name: 'Favorites',
      });
    }

    let onPressMenu = function() {
      console.log('noop');
    }

    let favoritesButton;
    if(route.id !== 'favorites') {
      favoritesButton = 
        <TouchableOpacity onPress={onPressFavorites.bind(this)} style={styles.favoritesButton}>
          <Text style={styles.favoritesText}>
            Favs
          </Text>
        </TouchableOpacity>;
    }

    return (
      <View style={styles.rightAreaContainer}>
        {favoritesButton}
        <TouchableOpacity onPress={onPressMenu.bind(this)} style={styles.menuButton}>
          <Text style={styles.menuText}>
            Cog
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
};
