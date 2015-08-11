'use strict'

var React = require('react-native');
var SearchPage = require('./SearchPage')
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
var TopNavBar = require('./TopNavBar')
var AppDetailPage = require('./AppDetailPage')


var {
  Navigator,
  StyleSheet,
  Text,
  View,
  WebView,
} = React;

var searchURL = "http://ios3.search.i4.cn/getAppList.xhtml?idfv=D5AD0CE2-54B1-4F8E-ABEB-FD323917347D&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=&cid=200025&toolversion=102&isAuth=1&type=0&remd=9&specialid=0&isjail=0"


var SearchNav = React.createClass({

  renderScene: function(route, nav) {
    switch(route.id)
    {
      case 'detail':
      return (<AppDetailPage app={route.app}/>)
      default :
      return (
        <SearchPage
        message={route.message}
        navigator={nav}
        searchURL={searchURL}
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
      initialRoute={{ message: "APP Search Scene", }}
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

module.exports = SearchNav;
