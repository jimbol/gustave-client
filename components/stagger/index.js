'use strict';

import React, {Component, View, Text, Animated} from 'react-native';

export default class Stagger extends Component {
  static propTypes = {
    components: React.PropTypes.array,
    style: View.propTypes.style,
    componentStyle: View.propTypes.style,
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
    return {
      opacity: this.state.animationValues[i],
    };
  }

  render() {
    let components = this.props.components;
    let animatedComponents = components.map((tag, i) => {

      return (
        <Animated.View
            key={i}
            style={[this.getComponentStyle(i), this.props.componentStyle, tag.props.componentStyle]}>
          {tag}
        </Animated.View>
      );

    });

    return (
      <View style={this.props.style}>
        {animatedComponents}
      </View>
    );
  }
}
