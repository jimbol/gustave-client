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

import React, {Component, View} from 'react-native';
import _ from 'lodash';
import Dimensions from 'Dimensions';

import {data} from '../../data/mock.json';
import * as styles from './styles';

import RecommendationScene from '../recommendation-scene';

export default class Gustave extends Component {

  constructor(props){
    super(props);
    this.styles = styles.create(Dimensions.get('window'));
  }

  static defaultProps = {
    recs: data
  };

  onCommit(recommendation){
    console.log(recommendation);
  }

  render() {
    return (
      <RecommendationScene recs={this.props.recs} style={this.styles.scene} onCommit={this.onCommit.bind(this)} />
    );
  }
}
