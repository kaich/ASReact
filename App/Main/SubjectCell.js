'use strict'

var React = require('react-native')
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} = React;


var SubjectCell = React.createClass({

  getInitialState: function(){
    return {
      subject: this.props.subject,
    };
  },

  render: function(){
    return (
      <TouchableWithoutFeedback  style={styles.container} onPress={this.props.onSelect}>
        <View>
          <View>
            <Text style={styles.name}>{this.state.subject.name}</Text>
            <Image source={{uri:this.state.subject.icon}} resizeMode='stretch' style={styles.image}/>
            <Text style={styles.info}>共有{this.state.subject.scount}个应用</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableWithoutFeedback>
    )
  },
})

var styles = StyleSheet.create({
  image:{
    height:150,
    marginHorizontal:10,
  },
  name:{
    fontSize:14,
    margin:10,
  },
  info:{
    fontSize:12,
    color:"#666666",
    margin:10,
  },
  separator:{
    height:6,
    backgroundColor: '#eeeeee',
  },
  container:{
    flexDirection: 'column',
  },
});

module.exports = SubjectCell;
