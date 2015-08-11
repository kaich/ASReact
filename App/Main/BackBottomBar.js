'use strict'

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} = React;

var BackBottomBar = React.createClass({

  render: function()
  {
   return (
       <View>
	 <TouchableOpacity style={styles.container} onPress={this.props.onBack}>
	   <Image
	   style={styles.image}
	   source={{uri :"back_backImg_30x30"}}
	   />
	 </TouchableOpacity>
       </View>
   );
  },

});

var styles = StyleSheet.create({
  container:{
    height:50,
    backgroundColor:'#236ee7',
  },
  image:{
    width:30,
    height:30,
  },
});

module.exports = BackBottomBar;
