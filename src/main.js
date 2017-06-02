/**
 * Day 3
 * twitter entrance animation
 */
'use strict';

import React,{ Component } from 'react';
import { Platform,Animated,Easing,Image,RefreshControl,ScrollView,StatusBar,StyleSheet,TabBarIOS,Text,TouchableHighlight,TouchableOpacity,View } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component{
  static propTypes = {

  };

  constructor(props){
    super(props);
    this.state = {
      transformAnim: new Animated.Value(1),
      opacityAnim: new Animated.Value(1)
    };
  }
  
  componentDidMount(){
    Animated.timing(
      this.state.transformAnim,
      {
        toValue: 50,
        duration: 1200,
        delay: 2000,
        easing: Easing.elastic(1)
      }
    ).start();
    Animated.timing(
      this.state.opacityAnim,
      {
        toValue: 0,
        duration: 800,
        delay: 2000,
        easing: Easing.elastic(1)
      }
    ).start();
  }

  render(){
    return (
      <Animated.View style={{...styles.entrance, opacity: this.state.opacityAnim}}>
        <AnimatedIcon name="logo-twitter" size={60} style={{...styles.entranceIcon, transform:[{scale: this.state.transformAnim}]}}></AnimatedIcon>
      </Animated.View>
    )
  }
}

export default class extends Component{
  render(){
    return (
      <Entrance />
      )
  }
}

const styles = {
  entrance: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Util.size.width,
    height: Util.size.height,
    backgroundColor: "#1b95e0",
    alignItems: "center",
    justifyContent: "center"
  },
  entranceIcon: {
    color: "#fff"
  }
}