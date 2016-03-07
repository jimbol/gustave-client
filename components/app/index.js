'use strict';

import React, {Component, StyleSheet, Navigator, StatusBar, View, Text} from 'react-native';
import _ from 'lodash';

import theme from '../../themes/default';
import * as database from '../../data';

import NavigationBar from '../navigation-bar';
import RecommendationsScene from '../recommendations-scene';
import RecommendationScene from '../recommendation-scene';
import SavedRecommendationsScene from '../saved-recommendations-scene';

export default class Gustave extends Component {

  // This makes props available for child components without passing it all the way down the tree
  // See: https://facebook.github.io/react/docs/context.html
  static childContextTypes = {
    theme: React.PropTypes.object,
    user: React.PropTypes.object,
  };
  getChildContext() {
    return {theme: this.state.theme, user: this.state.user};
  }

  state = {
    isLoadingMore: false,
    user: database.getUser(1),
    theme,
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
      ...Navigator.SceneConfigs.FloatFromBottomAndroid,
      // Overrides drag to dismiss gesture
      gestures: null,
    };
  }

  render() {
    let heartNumber = database.getUserSavedRecommendations(this.state.user.id).length;

    return (
      <View style={[styles.app, this.state.theme.lightBackground]}>
        <View style={[styles.statusBar, this.state.theme.darkBackground]} />
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
            recommendation={database.getUserRecommendation(route.recommendationId)}
            goBack={navigator.pop}/>
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

var styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  scene: {
    flex: 1,
    marginBottom: 50,
  },
  statusBar: {
    height: 20,
  }
});
