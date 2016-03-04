'use strict';

import React, {Component, Navigator, StatusBar, View, Text} from 'react-native';
import _ from 'lodash';

import * as database from '../../data';
import styles from './styles';

// import {NavigationBarRouteMapper, NavigationBarStyles} from '../navigation-bar';

import NavigationBar from '../navigation-bar';
import RecommendationsScene from '../recommendations-scene';
import RecommendationScene from '../recommendation-scene';
import SavedRecommendationsScene from '../saved-recommendations-scene';


export default class Gustave extends Component {

  state = {
    isLoadingMore: false,
    user: database.getUser(1),
  };

  initialRoute = {
    id: 'recommendations'
  };

  // Temporary for demo only
  checkNeedMoreRecs() {
    if (database.getUserRecommendations(this.state.user.id).length) return;

    this.setState({isLoadingMore: true});
    this.state.user.dismissed = [];

    setTimeout(() => this.setState({isLoadingMore: false}), 2000);
  }

  onViewRecommendation(navigator, recommendationId) {
    navigator.push({
      id: 'recommendation',
      recommendationId,
    });
  }

  onSaveRecommendation(recommendationId) {
    database.saveUserRecommendation(this.state.user.id, recommendationId);
    this.forceUpdate();
    this.checkNeedMoreRecs(); // Temp
  }

  onDismissRecommendation(recommendationId) {
    database.dismissUserRecommendation(this.state.user.id, recommendationId);
    this.forceUpdate();
    this.checkNeedMoreRecs(); // Temp
  }

  onConfigureScene(route, routeStack){
    return {
      ...Navigator.SceneConfigs.FloatFromBottom,
      // Overrides drag to dismiss gesture
      gestures: null
    };
  }

  render() {
    let heartNumber = database.getUserSavedRecommendations(this.state.user.id).length;

    return (
      <View style={styles.app}>
        <View style={styles.statusBar} />
        <StatusBar barStyle="light-content" />
        <Navigator
          initialRoute={this.initialRoute}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.onConfigureScene.bind(this)}
          navigationBar={
            <NavigationBar navigator={this.navigator} heartNumber={heartNumber} />
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
            isLoadingMore={this.state.isLoadingMore}
            nextRecommendation={database.getUserRecommendations(this.state.user.id)[0]}
            dismissRecommendation={this.onDismissRecommendation.bind(this)}
            saveRecommendation={this.onSaveRecommendation.bind(this)}/>
        );

      case 'recommendation':
        return (
          <RecommendationScene
            style={styles.scene}
            recommendation={database.getUserRecommendation(route.recommendationId)}/>
        );

      case 'saved':
        return (
          <SavedRecommendationsScene
            style={styles.scene}
            savedRecommendations={database.getUserSavedRecommendations(this.state.user.id)}
            viewRecommendation={this.onViewRecommendation.bind(this, navigator)}
            removeSavedRecommendation={this.onDismissRecommendation.bind(this)}/>
        );
    }
  }
}
