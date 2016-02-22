'use strict';

import React, {Component, Navigator, StatusBar, View} from 'react-native';
import _ from 'lodash';

import {data} from '../../data/mock.json';
import styles from './styles';

import {NavigationBarRouteMapper, NavigationBarStyles} from '../navigation-bar';

import RecommendationsScene from '../recommendations-scene';
import RecommendationScene from '../recommendation-scene';
import ConciergeScene from '../concierge-scene';
import SavedScene from '../saved-scene';


export default class Gustave extends Component {

  static defaultProps = {
    recommendations: data,
    saved: [],
  };

  initialRoute = {
    id: 'recommendations',
    name: 'Recommendations',
  };

  // Context: Navigator
  onViewRecommendation(navigator, recommendation) {
    navigator.push({
      id: 'recommendation',
      name: 'Recommendation',
      recommendation: recommendation,
    });
  }

  // Context: Navigator
  onViewConcierge(navigator, recommendation) {
    navigator.push({
      id: 'concierge',
      name: 'Concierge',
      recommendation: recommendation,
    });
  }

  onConfigureScene(route, routeStack){
    return {
      ...Navigator.SceneConfigs.FloatFromBottom, 
      // Overrides drag to dismiss gesture
      gestures: null
    };
  }

  render() {
    return (
      <View style={styles.app}>
        <StatusBar barStyle="light-content" />
        <Navigator
          initialRoute={this.initialRoute}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.onConfigureScene.bind(this)}
          navigationBar={
            <Navigator.NavigationBar
              style={NavigationBarStyles.navigationBar}
              routeMapper={NavigationBarRouteMapper} />
          } />
      </View>
    );
  }

  renderScene(route, navigator) {
    switch(route.id) {
      case 'recommendations':
        return (
          <RecommendationsScene
            style={styles.scene}
            recommendations={this.props.recommendations}
            viewConcierge={this.onViewConcierge.bind(this, navigator)} />
        );

      case 'recommendation':
        return (
          <RecommendationScene
            style={styles.scene}
            recommendation={route.recommendation}
            viewConcierge={this.onViewConcierge.bind(this, navigator)} />
        );

      case 'concierge':
        return (
          <ConciergeScene
            style={styles.scene}
            recommendation={route.recommendation} />
        );

      case 'saved':
        let saved = Array.from(this.props.recommendations);
        return (
          <SavedScene 
            style={styles.scene} 
            savedRecommendations={saved}
            viewRecommendation={this.onViewRecommendation.bind(this, navigator)} />
        );
    }
  }
}
