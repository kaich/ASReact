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


var RankPage = React.createClass({
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
      <View style={{backgroundColor:"#ffffff",height:100*vh-140,width:100*vw}}>
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
        <View style={{marginHorizontal:40,marginBottom:10}}>
          <SegmentedControlIOS
          values={this.props.segmentTitles}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
          tintColor="gray"
          />
        </View>
        <View style={{flex:1}}>
           <ScrollView
           style={styles.mainScrollView}
           horizontal={true}
           directionalLockEnabled={true}
           pagingEnabled={true}
           scrollEnabled={false}
           automaticallyAdjustContentInsets={false}
           contentOffset={{x:this.state.selectedIndex*100*vw,y:0}}
           >
             {
               this.props.pages.map((url,index)=>{
                return this.getPage(url,index)
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
  },
  mainScrollView:{
    backgroundColor:'#ffffff',
  }
});

module.exports=RankPage;
