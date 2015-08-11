'use strict';

var React = require('react-native');
var RCTRefreshControl = require('RCTRefreshControl');
var NewsCell = require('./NewsCell')
var FooterLoading = require('./FooterLoading')
var TopNavBar = require('./TopNavBar')

var {
  AppRegistry,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var LISTVIEW = 'ListView';


var DOMParser = require('xmldom').DOMParser

var NewsPage = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      pageIndex: 1,
      newsList:[],
      loading:true,
    };
  },

  componentDidMount: function() {

    // ListView
    RCTRefreshControl.configure({
      node: this.refs[LISTVIEW]
    }, () => {
       this.getNewsList(1,()=>{RCTRefreshControl.endRefreshing(this.refs[LISTVIEW]);})
    });

    this.getNewsList(1)
  },

  getNewsList: function(pageNO,callback){
   var fullUrl = this.props.url + "&page=" + pageNO
   fetch(fullUrl)
   .then(response => response.json())
   .then(newsList =>{
    if(pageNO ==1)
      this.state.newsList= newsList
    else
      this.state.newsList=this.state.newsList.concat(newsList)
    var weakThis = this
    var updateStateAfterFecthData = function(){
      weakThis.setState({
          dataSource: weakThis.state.dataSource.cloneWithRows(weakThis.state.newsList),
          pageIndex: weakThis.state.pageIndex+1,
          loading: false,
        })
       if(callback)
        callback()
    }
    setTimeout(updateStateAfterFecthData,200)

     }).done();
  },


  _onCellSelect: function(news)
  {
     this.props.navigator.push({ id: 'news_detail', news:news })
  },

  _renderCell: function(news){
     return (<NewsCell news={news} onSelect={()=>{this._onCellSelect(news)}}  />);
  },


  _renderFooter: function () {
    return (
      <FooterLoading
        onPress={()=>{this.setState({loading:true});this.getNewsList(this.state.pageIndex);}}
       	loading={this.state.loading}
      />
    )
  },

  _getAutomaticallyAdjustContentInsetsValue: function(){
    if(this.props.automaticallyAdjustContentInsets == true)
    {
      return true
    }
    else
    {
      return false
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
         <TopNavBar title="发现"/>
         <ListView
          ref={LISTVIEW}
          dataSource={this.state.dataSource}
          renderRow={this._renderCell}
	        renderFooter={this._renderFooter}
          automaticallyAdjustContentInsets={this._getAutomaticallyAdjustContentInsetsValue()}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },

});

module.exports = NewsPage;
