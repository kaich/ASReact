'use strict';

var React = require('react-native');
var RCTRefreshControl = require('RCTRefreshControl');
var TypeCell = require('./TypeCell')
var FooterLoading = require('./FooterLoading')


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

var TypePage = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      pageIndex: 1,
      typeList:[],
      loading:true,
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
       this.getTypeList(1,()=>{RCTRefreshControl.endRefreshing(this.refs[LISTVIEW]);})
    });

    this.getTypeList(1)
  },

  getTypeList: function(pageNO,callback){
   var fullUrl = this.props.url
   fetch(fullUrl)
   .then(response => response.text())
   .then(responseText =>{
	this.state.typeList= new Array()
	var parser = new DOMParser()
	var doc = parser.parseFromString(responseText,"text/xml").documentElement
	var listNode = doc.getElementsByTagName("typelist")[0]
	var list = listNode.getElementsByTagName("type")
	for(var i=0;i<list.length;i++)
	{
	   var appType = new Object()
	   var emElement = list.item(i)
     appType.id = emElement.getElementsByTagName("id")[0].firstChild.data
     appType.name = emElement.getElementsByTagName("name")[0].firstChild.data
     appType.icon = emElement.getElementsByTagName("icon")[0].firstChild.data
     appType.sort = emElement.getElementsByTagName("sort")[0].firstChild.data
     appType.count = emElement.getElementsByTagName("count")[0].firstChild.data
	   this.state.typeList.push(appType)
	}
	this.setState({
	  dataSource: this.state.dataSource.cloneWithRows(this.state.typeList),
	  pageIndex: this.state.pageIndex,
	  loading: false,
	})
   if(callback)
    callback()
   })
  },


  _onCellSelect: function(appType)
  {
     this.props.navigator.push({ id: 'type_detail', appType:appType })
  },

  _renderCell: function(appType){
     return (<TypeCell appType={appType} onSelect={()=>{this._onCellSelect(appType)}}/>);
  },

  render: function() {
    return (
      <View style={styles.container}>
         <ListView
          ref={LISTVIEW}
          dataSource={this.state.dataSource}
          renderRow={this._renderCell}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },

});

module.exports = TypePage;
