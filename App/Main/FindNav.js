'use strict'

var React = require('react-native');
var NewsPage = require('./NewsPage')
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
var TopNavBar = require('./TopNavBar')


var {
  Navigator,
  StyleSheet,
  Text,
  View,
  WebView,
} = React;

var newsURL = "http://www.i4.cn/ajax.php?a=getoldnewsforpage&itype=2&n=20"
var newsDetailBaseURL= "http://m.i4.cn/index.php?m=wap&a=newscontentios&"


var FindNav = React.createClass({

  renderScene: function(route, nav) {
    switch(route.id)
    {
      case 'news_detail':
      return (
        <View style={{flex:1,backgroundColor:"#ffffff"}}>
        <TopNavBar title="资讯详情"/>
        <WebView
        automaticallyAdjustContentInsets={true}
         url={newsDetailBaseURL + "id=" +route.news.id}
         startInLoadingState={true}
         bounces={true}
         />
        </View>
        )
      default :
      return (
        <NewsPage
        message={route.message}
        navigator={nav}
        url={newsURL}
        news={route.news}
        automaticallyAdjustContentInsets={true}
        />
      );
    }
  },

  render: function()
  {
    return (
      <Navigator
      style={styles.container}
      initialRoute={{ message: "APP Find Scene", }}
      renderScene={this.renderScene}
      configureScene={(route) => {
	if (route.sceneConfig) {
	  return route.sceneConfig;
	}
	return Navigator.SceneConfigs.FloatFromBottom;
      }}
      />
    );
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = FindNav;
