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
        delay: 1000,
        easing: Easing.elastic(1)
      }
    ).start();
    Animated.timing(
      this.state.opacityAnim,
      {
        toValue: 0,
        duration: 800,
        delay: 1000,
        easing: Easing.elastic(1)
      }
    ).start();
    setTimeout(()=>{
      this.props.hide();
    },1300)
    
  }

  render(){
    return (
      <Animated.View style={{...styles.entrance, opacity: this.state.opacityAnim}}>
        <AnimatedIcon name="logo-twitter" size={60} style={{...styles.entranceIcon, transform:[{scale: this.state.transformAnim}]}}></AnimatedIcon>
      </Animated.View>
    )
  }
}

class TwitterPost extends Component{
  state = {
      isRefreshing: false
  }

  _onRefresh = ()=>{
    this.setState({
      isRefreshing: true
    });
    setTimeout(()=>{
      this.setState({
        isRefreshing: false
      })
    },1000)
  }
  render(){
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ddd"
          />
        }
      >
        <Image source={require('./img/day3.png')} style={styles.img}></Image>
      </ScrollView>
    )
  }
}

class TwitterFlow extends Component{
  render(){
    return(
      <View>
        <View style={styles.nav}>
          <View style={styles.navLeft}>
            <Icon name="ios-person-add" size={23} style={{color:"#1b95e0", paddingLeft:10}}></Icon>
          </View>
          <View style={styles.navMid}>
            <Icon name="logo-twitter" size={27} style={{color:"#1b95e0"}}></Icon>
          </View>
          <View style={styles.navRight}>
            <Icon name="ios-search" size={23} style={{color:"#1b95e0", width:30}}></Icon>
            <Icon name="ios-create-outline" size={23} style={{color:"#1b95e0", width:30, paddingRight:10}}></Icon>
          </View>
        </View>
        <TwitterPost></TwitterPost>
      </View>      
    )
  }
}

class TwitterTab extends Component{
  state = {
    selectedTab: "主页"
  }

  changeTab(tab){
    this.setState({
      selectedTab: tab
    })
  }

  render(){
    return(
      <TabBarIOS
          barTintColor="#fff"
          tintColor="#1b95e0"
        >
        <Icon.TabBarItem
          title="主页"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          onPress={ this.changeTab.bind(this,"主页") }
          selected={ this.state.selectedTab === "主页" }>
          <TwitterFlow/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="通知"
          iconName="ios-notifications-outline"
          selectedIconName="ios-notifications"
          onPress={ this.changeTab.bind(this,"通知") }
          selected={ this.state.selectedTab === "通知"}>
          <TwitterFlow/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="私信"
          iconName="ios-mail-outline"
          selectedIconName="ios-mail"
          onPress={ this.changeTab.bind(this,"私信") }
          selected={ this.state.selectedTab === "私信"}>
          <TwitterFlow/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="我"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          onPress={ this.changeTab.bind(this,"我") }
          selected={ this.state.selectedTab === "我"}>
          <TwitterFlow/>
        </Icon.TabBarItem>
      </TabBarIOS>
    )
  }
}

export default class extends Component{
  state = {
    entranceVisible: true
  }

  _hideEntrance = () => {
    this.setState({
      entranceVisible: false
    })
  }
  render(){
    let entrance = this.state.entranceVisible ? <Entrance hide={this._hideEntrance}/> : null
    return (
      <View style={styles.twitterContainer}>
        <TwitterTab/>
        {entrance}
      </View>
      
    )
  }
}

const styles = {
  twitterContainer:{
    width: Util.size.width,
    height: Util.size.height
  },
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
  },
  img: {
    width: Util.size.width,
    height: Util.size.height-110
  },
  nav: {
    flexDirection: "row",
    paddingTop: 30, paddingLeft: 10,paddingBottom: 5,
    marginBottom: 5,
    borderBottomWidth: Util.pixel, borderColor: "#ddd"
  },
  navLeft: {
    flex: 1,
    justifyContent: "flex-start"
  },
  navMid: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  navRight: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  }
}