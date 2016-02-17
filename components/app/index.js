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

export default class Gustave extends Component {

  static defaultProps = {
    recs: data
  };

  onCommit(recommendation){
    console.log(recommendation);
  }

  render() {
    return (
      <Navigator 
        style={styles.scene}
        initialRoute={{id: 'rec'}}
        renderScene={this._navigatorRenderScene.bind(this)} />
    );
  }

  _navigatorRenderScene(route, navigator) {
    switch(route.id) {
      case 'rec':
        return (
          <RecommendationScene navigator={navigator} recs={this.props.recs} onCommit={this.onCommit.bind(this)} />
        );
    }
  }
  // render() {
  //   return (
  //     <RecommendationScene recs={this.props.recs} style={styles.scene} onCommit={this.onCommit.bind(this)} />
  //   );
  // }
}
