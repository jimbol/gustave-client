'use strict';

import React, {
  Component,
  Text,
  TouchableOpacity,
  View,
  Navigator,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';

import styles from './styles';

export {styles as NavigationBarStyles};

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

  savedScale: new Animated.Value(1),

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

    let savedStyles = {
      transform: [{scale: this.savedScale}]
    };

    if (navigator.props.justSaved) {
      Animated.sequence([
        Animated.timing(this.savedScale, {
          toValue: 1.2,
          duration: 200,
          easing: Easing.inOut(Easing.quad)
        }),
        Animated.timing(this.savedScale, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.quad)
        }),
        Animated.timing(this.savedScale, {
          toValue: 1.2,
          duration: 200,
          easing: Easing.inOut(Easing.quad)
        }),
        Animated.timing(this.savedScale, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.quad)
        }),
      ]).start()
    }

    return (
      <View style={styles.rightAreaContainer}>
        <TouchableOpacity onPress={onPressSaved.bind(this)} style={styles.savedButton} activeOpacity={savedIconOpacity}>
          <Animated.Text style={[styles.savedText, savedStyles]}>
            {'\u2605'}
          </Animated.Text>
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
