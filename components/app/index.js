'use strict';

import React, {Component, StyleSheet, Navigator, StatusBar, View, Text} from 'react-native';
import _ from 'lodash';

import theme, {statusBar} from '../../themes/default';
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
    database: React.PropTypes.object,
  };
  getChildContext() {
    return {theme: this.state.theme, user: this.state.user, database: this.state.database};
  }

  state = {
    isLoadingMore: false,
    user: database.getUser(1),
    theme,
    database,
  };

  initialRoute = {
    id: 'recommendations'
  };

  // Temporary for demo only
  checkNeedMoreRecs() {
    if (database.getUserRecommendations(this.state.user.id).length) return;

    this.setState({isLoadingMore: true});
    this.state.user.dismissed = [];

    setTimeout(() => this.setState({isLoadingMore: false}), 750);
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

  onToggleRecommendation() {
    this.forceUpdate();
  }

  onGoBack() {
    let routeStack = this.refs.navigator.getCurrentRoutes();
    if (routeStack.length > 1) {
      let index = routeStack.length - 2;
      let route = routeStack[index];

      if (route.id === 'recommendation')
        this.refs.navigator.popToRoute(route);
      else
        this.refs.navigator.resetTo({id: route.id});
    }
  }

  onConfigureScene(route, routeStack){
    return {
      ...Navigator.SceneConfigs.FloatFromBottomAndroid,
      // Overrides drag to dismiss gesture
      gestures: null,
    };
  }

  renderScene(route, navigator) {
    switch(route.id) {
      case 'recommendations':
        return (
          <RecommendationsScene
            isLoadingMore={this.state.isLoadingMore}
            nextRecommendation={database.getUserRecommendations(this.state.user.id)[0]}
            dismissRecommendation={this.onDismissRecommendation.bind(this)}
            saveRecommendation={this.onSaveRecommendation.bind(this)}
            onToggleRecommendation={this.onToggleRecommendation.bind(this)}/>
        );

      case 'recommendation':
        return (
          <RecommendationScene
            recommendation={database.getUserRecommendation(route.recommendationId)}
            goBack={this.onGoBack.bind(this)}
            onToggleRecommendation={this.onToggleRecommendation.bind(this)}/>
        );

      case 'saved':
        return (
          <SavedRecommendationsScene
            savedRecommendations={database.getUserSavedRecommendations(this.state.user.id)}
            viewRecommendation={this.onViewRecommendation.bind(this, navigator)}
            removeSavedRecommendation={this.onDismissRecommendation.bind(this)}/>
        );
    }
  }

  render() {
    let heartNumber = database.getUserSavedRecommendations(this.state.user.id).length;

    return (
      <View style={[styles.app, this.state.theme.lightBackground]}>
        <View style={[styles.statusBar, this.state.theme.darkBackground]} />
        <StatusBar barStyle={statusBar} />
        <Navigator
          ref="navigator"
          sceneStyle={styles.scene}
          initialRoute={this.initialRoute}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.onConfigureScene.bind(this)}
          navigationBar={
            <NavigationBar navigator={this.navigator} heartNumber={heartNumber} />
          } />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  scene: {
    marginBottom: 50,
  },
  statusBar: {
    height: 20,
  }
});
