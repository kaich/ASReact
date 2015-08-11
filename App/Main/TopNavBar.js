'use strict'

var React = require('react-native')
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;


var TopNavBar = React.createClass({

  getInitialState: function(){
    return {
      subject: this.props.subject,
    };
  },

  render: function(){
    return (
      <View style={[styles.topNav,{height: this.props.height !== undefined ? this.props.height : 60}]}>
        {React.Children.map(this.props.children, React.addons.cloneWithProps)}
        {
          this.props.title !== undefined ?
            <Text style={styles.title}>{this.props.title}</Text>
          :
          <View/>
        }
      </View>
    )
  },
})

var styles = StyleSheet.create({
  topNav:{
    backgroundColor:'#008aff',
    height:60,
    justifyContent:'flex-end',
    alignItems:'center',
  },
  title:{
    fontSize:16,
    color:'#ffffff',
    fontWeight: 'bold',
    paddingBottom:5,
  },
});

module.exports = TopNavBar;
