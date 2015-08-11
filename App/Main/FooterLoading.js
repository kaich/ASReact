'use strict'

var React = require('react-native')
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;


var FooterLoading = React.createClass({
  mixins: [React.addons.LinkedStateMixin],


  render: function(){
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor='#FFFFFF'>
        <View style={styles.containerFooter}>
          <Text style={styles.loadeMoreBtn}>
          {this.props.loading == true ? "数据正在加载中..." : "点击加载更多..." }
          </Text>
              {this.props.loading == true ?
                <ActivityIndicatorIOS
                 animating={true}
                 style={{height: 26,width:26, marginLeft: -30*vw,flex:1}}
                 size="small"
               />
                :
              <Image
                source={{uri: ''}}
                style={{width: 26, height: 26, flex: 1, marginLeft: -30*vw,}}
              />

                }
        </View>
      </TouchableHighlight>
    )
  },
})

var styles = StyleSheet.create({
  containerFooter: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  },

  loadeMoreBtn: {
    textAlign: 'right',
    flex: 1,
    color: '#333333',
    fontSize: 14,
    marginTop: 5,
  },
});

module.exports = FooterLoading;
