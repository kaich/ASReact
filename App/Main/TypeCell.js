'use strict'

var React = require('react-native')
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} = React;


var TypeCell = React.createClass({

  getInitialState: function(){
    return {
      appType: this.props.appType,
    };
  },

  render: function(){
    return (
      <TouchableWithoutFeedback  style={styles.container} onPress={this.props.onSelect}>
        <View>
          <View style={styles.contentContainer}>
            <Image source={{uri:this.state.appType.icon}} resizeMode='stretch' style={styles.image}/>
            <Text style={styles.name}>{this.state.appType.name}</Text>
            <Text style={styles.info}>{this.state.appType.count}个资源</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableWithoutFeedback>
    )
  },
})

var styles = StyleSheet.create({
  image:{
    height:50,
    width:50,
    margin:10,
  },
  name:{
    fontSize:14,
    margin:10,
  },
  info:{
    fontSize:12,
    color:"#666666",
    right:10,
    top:30,
    position:'absolute',
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
});

module.exports = TypeCell;
