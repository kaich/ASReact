'use strict'

var React = require('react-native')
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} = React;


var NewsCell = React.createClass({

  getInitialState: function(){
    return {
      news: this.props.news,
    };
  },

  render: function(){
    return (
      <TouchableWithoutFeedback  style={styles.container} onPress={this.props.onSelect}>
        <View>
          <View style={styles.contentContainer}>
            <Image source={{uri:this.state.news.fwapimage}} resizeMode='stretch' style={styles.image}/>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{this.state.news.stitle}</Text>
              <Text style={styles.info} numberOfLines={2}>{this.state.news.tcontent}</Text>
              <Text style={styles.time}>{this.state.news.dcreatetime}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableWithoutFeedback>
    )
  },
})

var styles = StyleSheet.create({
  image:{
    height:80,
    width:100,
    margin:10,
  },
  name:{
    fontSize:14,
    paddingBottom:5,
  },
  time:{
    fontSize:12,
    color:"#666666",
  },
  info:{
    fontSize:13,
    color:"#999999",
    paddingBottom:5,
    paddingRight:10,
  },
  separator:{
    height:6,
    backgroundColor: '#eeeeee',
  },
  container:{
    flexDirection: 'column',
  },
  contentContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  infoContainer:{
    flex:1,
    flexDirection:'column',
  },
});

module.exports = NewsCell;
