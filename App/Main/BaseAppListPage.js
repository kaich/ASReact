'use strict';

var React = require('react-native');
var RCTRefreshControl = require('RCTRefreshControl');
var AppListCell = require('./AppListCell')
var FooterLoading = require('./FooterLoading')


var {
  AppRegistry,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  InteractionManager,
} = React;

var LISTVIEW = 'ListView';


var DOMParser = require('xmldom').DOMParser
var TimerMixin = require('react-timer-mixin');

var BaseAppListPage = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      pageIndex: 1,
      adList:[],
      appList:[],
      loading:true,
      allLoaded:false,
    };
  },

  shouldComponentUpdate: function(nextProps,nextState){
    if(nextProps.needLoadData == true)
    {
      return true
    }
    else
    {
      return false
    }
  },

  componentDidMount: function() {

    // ListView
    RCTRefreshControl.configure({
      node: this.refs[LISTVIEW]
    }, () => {
       this.getAppList(1,()=>{RCTRefreshControl.endRefreshing(this.refs[LISTVIEW]);})
    });

    this.getAppList(1)
  },

  getAppList: function(pageNO,callback){
   var fullUrl = this.props.url + "&pageno=" + pageNO
   fetch(fullUrl)
   .then(response => response.text())
   .then(responseText =>{

     InteractionManager.runAfterInteractions(() => {
   // ...long-running synchronous task...
   if(pageNO==1)
     this.state.appList= new Array()
   var parser = new DOMParser()
   var doc = parser.parseFromString(responseText,"text/xml").documentElement
   var listNode = doc.getElementsByTagName("applist")[0]
   if(listNode !== undefined)
   {
     var list = listNode.getElementsByTagName("app")
     for(var i=0;i<list.length;i++)
     {
        var app = new Object()
        var emElement = list.item(i)
        app.id = emElement.getElementsByTagName("id")[0].firstChild.data
        app.name = emElement.getElementsByTagName("appname")[0].firstChild.data
        app.slogan = emElement.getElementsByTagName("slogan")[0].firstChild.data
        app.icon = emElement.getElementsByTagName("icon")[0].firstChild.data
        app.version = emElement.getElementsByTagName("version")[0].firstChild.data
        app.plist = emElement.getElementsByTagName("plist")[0].firstChild.data
        app.path = emElement.getElementsByTagName("path")[0].firstChild.data
        app.sourceid = emElement.getElementsByTagName("sourceid")[0].firstChild.data
        app.pkagetype = emElement.getElementsByTagName("pkagetype")[0].firstChild.data
        app.images=[]
        this.state.appList.push(app)
     }

    var weakThis = this
    var updateStateAfterFecthData = function(){

      weakThis.setState({
          dataSource: weakThis.state.dataSource.cloneWithRows(weakThis.state.appList),
          pageIndex: weakThis.state.pageIndex+1,
          loading: false,
        })
       if(callback)
        callback()
  }

  // this.setTimeout(updateStateAfterFecthData,300)
  updateStateAfterFecthData()

   }
   else
   {
     this.setState({
         loading: false,
         allLoaded: true,
       })
   }

    });


   }).done();
  },


  _onCellSelect: function(app)
  {
     this.props.navigator.push({ id: 'detail', app:app })
  },

  _renderCell: function(app){
     return (<AppListCell app={app} onSelect={()=>{this._onCellSelect(app)}}  />);
  },


  _renderFooter: function () {
    if(this.state.allLoaded == true)
    {
      return null;
    }

    return (
      <FooterLoading
        onPress={()=>{this.setState({loading:true});this.getAppList(this.state.pageIndex);}}
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
        {React.Children.map(this.props.children, React.addons.cloneWithProps)}
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

module.exports = BaseAppListPage;
