'use strict';

import React, {Component, Navigator, StatusBar, View} from 'react-native';
import _ from 'lodash';

import {data} from '../../data/mock.json';
import styles from './styles';

import {NavigationBarRouteMapper, NavigationBarStyles} from '../navigation-bar';

import RecommendationsScene from '../recommendations-scene';
import RecommendationDetailScene from '../recommendation-detail-scene';
import ConciergeScene from '../concierge-scene';
import FavoritesScene from '../favorites-scene';


export default class Gustave extends Component {

  static defaultProps = {
    recommendations: data,
  };

  initialRoute = {
    id: 'recommendations',
    name: 'Recommendations',
  };

  // Context: Navigator
  onViewDetail(navigator, recommendation) {
    navigator.push({
      id: 'recommendation-detail',
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
    return Navigator.SceneConfigs.FloatFromBottom
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
            viewDetail={this.onViewDetail.bind(this, navigator)}
            viewConcierge={this.onViewConcierge.bind(this, navigator)} />
        );

      case 'recommendation-detail':
        return (
          <RecommendationDetailScene
            style={styles.scene}
            recommendation={route.recommendation}
            viewConcierge={navigator.onViewConcierge} />
        );

      case 'concierge':
        return (
          <ConciergeScene
            style={styles.scene}
            recommendation={route.recommendation}
            navigationContext={navigator.navigationContext} />
        );

      case 'favorites':
        return (
          <FavoritesScene style={styles.scene}/>
        );
    }
  }
}
