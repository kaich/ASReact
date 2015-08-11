'use strict'

var React = require('react-native')
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  LinkingIOS,
} = React;


var AppListCell = React.createClass({

  getInitialState: function(){
    return {
      app: this.props.app,
    };
  },

  _onPressInstall: function(){
    var linkURL = "itms-services://?action=download-manifest&url=" + this.state.app.plist
    LinkingIOS.openURL(linkURL);
  },

  render: function(){
    return (
      <View  style={styles.container}>
        <TouchableWithoutFeedback style={styles.container} onPress={this.props.onSelect}>
          <View style={styles.contentContainer}>
            <Image source={{uri: this.state.app.icon}} style={styles.thumb}/>
            <View style={styles.infoContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{this.state.app.name}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.info}>{this.state.app.version}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.slogan}>{this.state.app.slogan}</Text>
              </View>
            </View>
            <TouchableHighlight style={styles.button} onPress={this._onPressInstall}>
              <Text style={{color:'#ffffff',}}>安装</Text>
            </TouchableHighlight>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.separator}/>
      </View>
    )
  },
})

var styles = StyleSheet.create({
  thumb:{
    height:60,
    width:60,
    marginRight:10,
  },
  name:{
    fontSize:14,
  },
  info:{
    fontSize:12,
  },
  slogan:{
    fontSize:12,
  },
  textContainer:{
    justifyContent:'center',
  },
  separator:{
    height:6,
    backgroundColor: '#eeeeee',
  },
  contentContainer:{
    flexDirection: 'row',
    height:80,
    padding: 10,
    flex:1,
  },
  infoContainer:{
    flex:1,
    flexDirection: 'column',
    justifyContent:'center',
  },
  button:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#008aff',
    marginTop:15,
    right:0,
    height:30,
    width:50,
    marginLeft:10,
  },
  container:{
    flexDirection: 'column',
  },
});

module.exports = AppListCell;
