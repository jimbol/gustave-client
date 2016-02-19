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

    // It has to be done this way because of the way NavigationBar layers views
    if(route.id === 'favorites') {
      return (
      <View style={styles.rightAreaContainer}>
        <View style={styles.favoritesButton}>
          <Text style={[styles.favoritesText, {opacity: 0}]}>
            Favs
          </Text>
        </View>
        <TouchableOpacity onPress={onPressMenu.bind(this)} style={styles.menuButton}>
          <Text style={styles.menuText}>
            Cog
          </Text>
        </TouchableOpacity>
      </View>
      ); 
    }

    return (
      <View style={styles.rightAreaContainer}>
        <TouchableOpacity onPress={onPressFavorites.bind(this)} style={styles.favoritesButton}>
          <Text style={styles.favoritesText}>
            Favs
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
