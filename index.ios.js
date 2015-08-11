/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} = React;

var MainNav = require('./App/Main/MainNav.js')
var AppNav = require('./App/Main/AppNav.js')
var GameNav = require('./App/Main/GameNav.js')
var FindNav = require('./App/Main/FindNav.js')
var SearchNav = require('./App/Main/SearchNav.js')
var AppDetailPage = require('./App/Main/AppDetailPage.js')

var Titles = ["精选","应用","游戏","发现","搜索"]
var Icons = ["tabBar_default_28x28","tabBar_apps_28x28","tabBar_games_28x28","tabBar_discovery_28x28","tabBar_search_28x28"]
var SelectedIcons = ["tabBar_defaultSelect_28x28","tabBar_appsSelect_28x28","tabBar_gamesSelect_28x28","tabBar_discoverySelect_28x28","tabBar_searchSelect_28x28"]
var tabPage = [MainNav,AppNav,GameNav,FindNav,SearchNav]

var ASReact = React.createClass({

 getInitialState: function() {
    return {
      selectedTab:0,
    };
  },

  pressTab: function(selectedIndex){
     this.setState({
       selectedTab: selectedIndex,
     })
  },

  _renderTabPage: function(index) {
     var page = tabPage[index]
     return (React.createElement(page))
  },

  render: function() {
    return (
       <TabBarIOS tinColor="black" barTintColor="red">
        {
	    Titles.map((title,index) =>(
		    <TabBarIOS.Item
		    title={title}
		    icon={{uri: Icons[index]}}
		    selectedIcon={{uri: SelectedIcons[index]}}
		    onPress={()=>{this.pressTab(index)}}
		    selected={this.state.selectedTab == index}>
			    {this._renderTabPage(index)}
		    </TabBarIOS.Item>))
	}
       </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabbar:{
    backgroundColor: "#20bc33",
  },
});

AppRegistry.registerComponent('ASReact', () => ASReact);
