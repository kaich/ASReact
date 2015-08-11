'use strict'

var React = require("react-native")
var BaseAppListPage = require('./BaseAppListPage')
var TopNavBar = require('./TopNavBar')

var {
  StyleSheet,
  View,
  TextInput,
} = React

var INPUT_CONTROL = "search_control"

var SearchPage = React.createClass({

  getInitialState:function(){
    return {
      haveSearched:false,
      searchKeyword: "",
    }
  },

  _searchApps: function(event)
  {
    var searchText = event.nativeEvent.text
    if(searchText.length > 0)
    {
      this.setState({
        haveSearched:true,
        searchKeyword:searchText,
      })
    }
  },

  _searchTextChange: function(event){
    var searchText = event.nativeEvent.text
    this.setState({
      haveSearched:false,
      searchKeyword:searchText,
    })
  },

  // + "&keyword=" + this.refs.INPUT_CONTROL.value
  render: function(){
     return (
       <View style={styles.container}>
         <TopNavBar height={80}>
           <TextInput
           style = {styles.searchController}
           ref = {INPUT_CONTROL}
           placeholder="请输入应用游戏关键字..."
           returnKeyType="search"
           onSubmitEditing={this._searchApps}
           onChange={this._searchTextChange}
           clearButtonMode="while-editing"
           />
         </TopNavBar>
         {
           this.state.haveSearched ?
           <View style={styles.container}>
             <BaseAppListPage
             url={this.props.searchURL + "&keyword=" + this.state.searchKeyword}
             automaticallyAdjustContentInsets={true}
             needLoadData={true}
             navigator={this.props.navigator}/>
           </View>
           :
           <View/>
        }
       </View>
     )
  },

})

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  searchController:{
    height:30,
    backgroundColor:'#ffffff',
    marginTop:20,
    marginHorizontal:10,
    marginBottom:10,
    fontSize:15,
  },
})

module.exports = SearchPage;
