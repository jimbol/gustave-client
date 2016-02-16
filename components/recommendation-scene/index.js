'use strict';

import React, {Component, View, Text} from 'react-native';
import styles from './styles';
import Recommendation from '../recommendation';
import RecommendationDetail from '../recommendation-detail';
import Button from '../button';

export default class RecommendationScene extends Component {

  state = {
    recIndex: 0,
    expanded: false
  };

  nextRec() {
    this.setState({recIndex: this.getNextRecIndex()});
  }

  getNextRecIndex() {
    if (this.state.recIndex >= this.props.recs.length - 1){
      return 0;
    }else{
      return this.state.recIndex + 1;
    }
  }

  commitRec(){
    let rec = this.props.recs[this.state.recIndex];
    this.props.onCommit(rec);
  }

  toggleExpanded(){
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    let rec = this.props.recs[this.state.recIndex];
    let RecommendationComponent;

    if (!this.state.expanded) {
      RecommendationComponent = Recommendation;
    } else {
      RecommendationComponent = RecommendationDetail;
    }

    return (
      <View style={[this.props.style, styles.scene]}>
        <RecommendationComponent rec={rec} onToggleDetail={this.toggleExpanded.bind(this)} />

        <Button style={styles.commitButton} onPress={this.commitRec.bind(this)}>
          I'M DOWN
        </Button>
      </View>
    );
  }
}
