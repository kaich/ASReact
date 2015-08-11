'use strict'

var React = require('react-native')
var BaseAppListPage = require('./BaseAppListPage')
var SubjectPage = require('./SubjectPage')
var TypePage = require('./TypePage')
var RankPage = require('./RankPage')
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



var AppPage = React.createClass({
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

    if(index==1)
    {
      var needUpdate = (this.state.selectedIndex == index)
     return (
      <View style={{backgroundColor:"#ffffff",height:100*vh-120,width:100*vw}}>
        <SubjectPage
        url={url}
        needLoadData={needUpdate}
        navigator={this.props.navigator}
        />
      </View>
     )
    }
    else if (index==2) {
      return (
       <View style={{backgroundColor:"#ffffff",height:100*vh-120,width:100*vw}}>
         <RankPage
         needLoadData={this.state.selectedIndex == index}
         pages={this.props.rankPageUrls}
         segmentTitles={["流行","周排行","总排行"]}
         navigator={this.props.navigator}
         />
       </View>
      )
    }
    else if (index==4) {
      return (
       <View style={{backgroundColor:"#ffffff",height:100*vh-120,width:100*vw}}>
         <TypePage
         url={url}
         needLoadData={this.state.selectedIndex == index}
         navigator={this.props.navigator}
         />
       </View>
      )
    }
    else
    {
     return (
      <View style={{backgroundColor:"#ffffff",height:100*vh-120,width:100*vw}}>
        <BaseAppListPage
        url={url}
        needLoadData={this.state.selectedIndex == index}
        navigator={this.props.navigator}
        />
      </View>
     )
    }
  },

  render:function(){

    return(
      <View style={styles.container}>
        <View style={{marginTop:30, marginBottom:10,marginHorizontal:10,backgroundColor:'#f6f6f6'}}>
          <SegmentedControlIOS
          values={['推荐', '专题','排行','最新','分类']}
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
               this.props.pageUrls.map((url,index)=>{
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

module.exports=AppPage;
