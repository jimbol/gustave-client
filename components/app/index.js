'use strict';

/* Hierachy

  Navigation
  RecommendationScene
    RecommendationPreview
    RecommendationDetail
    Button
      -> CommitmentScene
  CommitmentScene
    Dickbutt

*/

import React, {Component, View, Navigator} from 'react-native';
import _ from 'lodash';

import {data} from '../../data/mock.json';
import styles from './styles';

import RecommendationScene from '../recommendation-scene';
import ConciergeScene from '../concierge-scene';

export default class Gustave extends Component {

  static defaultProps = {
    recs: data
  };

  onCommit(navigator, recommendation){
    navigator.push({id: 'commit', rec: recommendation});
  }

  onBack(navigator) {
    navigator.pop();
  }

  render() {
    return (
      <Navigator 
        style={styles.scene}
        initialRoute={{id: 'rec'}}
        renderScene={this._navigatorRenderScene.bind(this)}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom} />
      
      // We can add a reference to a styled component here to serve as a navigation bar for all scenes. Perfect place for a bottom nav bar.

    );
  }

  _navigatorRenderScene(route, navigator) {
    switch(route.id) {
      case 'rec':
        return (
          <RecommendationScene 
            navigator={navigator} 
            recs={this.props.recs} 
            onCommit={this.onCommit.bind(this)} />
        );
      case 'commit':
        return (
          <ConciergeScene navigator={navigator} rec={route.rec} onBack={this.onBack.bind(this)}/>
        );
    }
  }
}
