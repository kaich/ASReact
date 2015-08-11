'use strict'

var React = require('react-native');
var MainPage = require('./mainPage')
var AppDetailPage = require('./AppDetailPage')


var {
  Navigator,
  StyleSheet,
  Text,
  View,
} = React;

var MainNav = React.createClass({

  renderScene: function(route, nav) {
       switch(route.id)
       {
         case 'detail':
	   return (<AppDetailPage app={route.app}/>)
	 default :
	   return (
	     <MainPage
	     message={route.message}
	     navigator={nav}
	     />
	   );
       }
  },

  render: function()
  {
    return (
      <Navigator
      style={styles.container}
      initialRoute={{ message: "Main Scene", }}
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

module.exports = MainNav;
