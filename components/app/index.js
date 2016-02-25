'use strict';

import React, {Component, Navigator, StatusBar, View} from 'react-native';
import _ from 'lodash';

import {data} from '../../data/mock.json';
import styles from './styles';

import {NavigationBarRouteMapper, NavigationBarStyles} from '../navigation-bar';

import RecommendationsScene from '../recommendations-scene';
import RecommendationScene from '../recommendation-scene';
import ConciergeScene from '../concierge-scene';
import SavedRecommendationsScene from '../saved-recommendations-scene';


export default class Gustave extends Component {

  state = {
    recommendations: Array.from(data),
    saved: [],
    isLoadingMore: false,
  };

  initialRoute = {
    id: 'recommendations',
    name: 'Recommendations',
  };

  onRequestMore() {
    let newRecs = Array.from(data);
    let unsavedNewRecs = _.difference(newRecs, this.state.saved);

    this.setState({isLoadingMore: true});

    setTimeout(() => {
      this.setState({
        recommendations: unsavedNewRecs,
        isLoadingMore: false,
      });
    }, 2000);
  }

  onViewRecommendation(navigator, recommendation) {
    navigator.push({
      id: 'recommendation',
      name: 'Recommendation',
      recommendation: recommendation,
    });
  }

  onSaveRecommendation(recommendation) {
    let saved = this.state.saved.concat([recommendation]);
    let recommendations = this.state.recommendations.filter(rec => recommendation.id !== rec.id);
    this.setState({
      saved,
      justSaved: true,
      recommendations,
    });
    this.setState({justSaved: false});
  }

  onDismissRecommendation(recommendation) {
    let recommendations = this.state.recommendations.filter(rec => recommendation.id !== rec.id);
    this.setState({recommendations});
  }

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
        <Navigator ref="navigator"
          justSaved={this.state.justSaved}
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
            requestMore={this.onRequestMore.bind(this)}
            isLoadingMore={this.state.isLoadingMore}
            recommendations={this.state.recommendations}
            dismissRecommendation={this.onDismissRecommendation.bind(this)}
            saveRecommendation={this.onSaveRecommendation.bind(this)}
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
        return (
          <SavedRecommendationsScene
            style={styles.scene}
            savedRecommendations={this.state.saved}
            viewRecommendation={this.onViewRecommendation.bind(this, navigator)} />
        );
    }
  }
}
