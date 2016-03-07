'use strict';

import React, {Component, View, Text, Animated} from 'react-native';
import styles from './styles';




// START HERE
//
// Flex direction
// Weird wrapping in detail screen
//



export default class Stagger extends Component {
  static propTypes = {
    components: React.PropTypes.array,
  };

  state = {
    animationValues: [],
  };

  componentDidMount() {
    let animationValues = [];
    let animations = this.props.components.map(function(){

      let animation = new Animated.Value(0);
      animationValues.push(animation);

      return Animated.timing(animation, {
        toValue: 1,
        duration: 250,
      });

    }.bind(this));

    this.setState({animationValues});
    Animated.stagger(50, animations).start()
  }

  getComponentStyle(i){
    let animation = this.state.animationValues[i];

    return {
      opacity: animation,
      flexWrap: 'wrap',
    };
  }

  render() {
    let components = this.props.components;
    let animatedComponents = components.map(function(tag, i){

      return <Animated.View
        key={i}
        style={this.getComponentStyle(i)}>
          {tag}
        </Animated.View>

    }.bind(this));

    return (
      <View style={styles.container}>
        {animatedComponents}
      </View>
    );
  }
}
