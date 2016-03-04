'use strict';

var _ = require('lodash');

import React, {
  Component,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './styles';

export default class NavigationBar extends Component {

  static propTypes = {
    navigator: React.PropTypes.object,
    heartNumber: React.PropTypes.number,
  };

  static defaultProps = {
  };

  state = {
  };

  savedScale = new Animated.Value(1);

  componentWillReceiveProps() {
  }

  componentWillMount() {
  }

  componentDidUpdate(prevProps) {
    let newHearted = this.props.heartNumber > prevProps.heartNumber;
    if (newHearted) {
      Animated.sequence([
        Animated.timing(this.savedScale, {
          toValue: 1.2,
          duration: 200,
          easing: Easing.inOut(Easing.quad)
        }),
        Animated.timing(this.savedScale, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.quad)
        }),
        Animated.timing(this.savedScale, {
          toValue: 1.2,
          duration: 200,
          easing: Easing.inOut(Easing.quad)
        }),
        Animated.timing(this.savedScale, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.quad)
        }),
      ]).start()
    }
  }

  onBackClick() {
    this.goToOrPushRoute('recommendations');
  }

  onHeartClick() {
    this.goToOrPushRoute('saved');
  }

  onSettingsClick() {
    this.goToOrPushRoute('settings');
  }

  goToOrPushRoute(id) {
    let route = _.find(this.props.navigator.getCurrentRoutes(), {id});

    if(route){
      this.props.navigator.popToRoute(route);
    } else {
      this.props.navigator.push({id});
    }
  }

  render() {
    let currentRoutes = this.props.navigator.getCurrentRoutes();
    let currentRoute = _.last(currentRoutes);

    let homeStyles = currentRoute.id === 'recommendations' ? {opacity:1} : null;
    let heartsStyles = currentRoute.id === 'saved' ? {opacity:1} : {};
    let menuStyles = currentRoute.id === 'settings' ? {opacity:1} : null;

    heartsStyles.transform = [{scale: this.savedScale}];

    return (
      <View style={styles.container}>
        <View style={[styles.buttonContainer, homeStyles]}>
          <TouchableOpacity
            onPress={this.onBackClick.bind(this)}
            style={[styles.button, styles.backButton]}>
            <Icon name="home" style={[styles.icon, styles.backIcon]} />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.buttonContainer, heartsStyles]}>
          <TouchableOpacity
            onPress={this.onHeartClick.bind(this)}
            style={[styles.button, styles.heartsButton]}>
            <Icon name="favorite" style={[styles.icon, styles.heartsIcon]} />
          </TouchableOpacity>
        </Animated.View>

        <View style={[styles.buttonContainer, menuStyles]}>
          <TouchableOpacity
            onPress={this.onSettingsClick.bind(this)}
            style={[styles.button, styles.menuButton]}>
            <Icon name="menu" style={[styles.icon, styles.settingsIcon]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
