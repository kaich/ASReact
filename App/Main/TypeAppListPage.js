'use strict'

var React = require('react-native')
var BaseAppListPage = require('./BaseAppListPage')
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  SegmentedControlIOS,
  ScrollView,
} = React;


var TypeAppListPage = React.createClass({
  getInitialState:function(){
    return {
      selectedIndex:0,
    }
  },

  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  },

  getPage: function(url,index)
  {
     return (
      <View style={{backgroundColor:"#ffffff",height:100*vh-120,width:100*vw}}>
        <BaseAppListPage
        url={url}
        needLoadData={index == this.state.selectedIndex}
        navigator={this.props.navigator}
        />
      </View>
     )
  },

  render:function(){

    return(
      <View style={styles.container}>
        <View style={{marginHorizontal:10,marginTop:30,marginBottom:10}}>
          <SegmentedControlIOS
          values={this.props.segmentTitles}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
          />
        </View>
        <View style={{flex:1}}>
           <ScrollView
           style={styles.mainScrollView}
           horizontal={true}
           directionalLockEnabled={true}
           scrollEnabled={false}
           automaticallyAdjustContentInsets={false}
           contentOffset={{x:this.state.selectedIndex*100*vw,y:0}}
           >
             {
               this.props.pages.map((url,index)=>{
                return this.getPage(url+"&type="+this.props.appType.id,index)
               }
               )
             }
           </ScrollView>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#ffffff'
  },
  mainScrollView:{
    backgroundColor:'#ffffff',
  }
});

module.exports=TypeAppListPage;
