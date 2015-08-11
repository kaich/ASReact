'use strict';

var React = require('react-native');
var RCTRefreshControl = require('RCTRefreshControl');
var SubjectCell = require('./SubjectCell')
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

var SubjectPage = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      pageIndex: 1,
      subjectList:[],
      loading:false,
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
       this.getSubjectList(1,()=>{RCTRefreshControl.endRefreshing(this.refs[LISTVIEW]);})
    });

    this.getSubjectList(1)
  },

  getSubjectList: function(pageNO,callback){
   var fullUrl = this.props.url
   fetch(fullUrl)
   .then(response => response.text())
   .then(responseText =>{
  this.state.subjectList= new Array()
	var parser = new DOMParser()
	var doc = parser.parseFromString(responseText,"text/xml").documentElement
	var listNode = doc.getElementsByTagName("speciallist")[0]
	var list = listNode.getElementsByTagName("special")
	for(var i=0;i<list.length;i++)
	{
	   var subject = new Object()
	   var emElement = list.item(i)
     subject.id = emElement.getElementsByTagName("id")[0].firstChild.data
     subject.name = emElement.getElementsByTagName("name")[0].firstChild.data
     subject.introduce = emElement.getElementsByTagName("introduce")[0].firstChild.data
     subject.icon = emElement.getElementsByTagName("icon")[0].firstChild.data
     subject.order = emElement.getElementsByTagName("order")[0].firstChild.data
     subject.scount = emElement.getElementsByTagName("scount")[0].firstChild.data
	   this.state.subjectList.push(subject)
	}
	this.setState({
	  dataSource: this.state.dataSource.cloneWithRows(this.state.subjectList),
	  pageIndex: this.state.pageIndex,
	  loading: true,
	})
 if(callback)
  callback()
   })
  },


  _onCellSelect: function(subject)
  {
     this.props.navigator.push({ id: 'subject_detail', subject:subject })
  },

  _renderCell: function(subject){
     return (<SubjectCell subject={subject} onSelect={()=>{this._onCellSelect(subject)}}/>);
  },

  _renderFooter: function () {
    return (
      <FooterLoading
        onPress={()=>{this.setState({loading:true});this.getSubjectList(this.state.pageIndex);}}
       	loading={this.state.loading}
      />
    )
  },

  render: function() {
    return (
      <View style={styles.container}>
         <ListView
          ref={LISTVIEW}
          dataSource={this.state.dataSource}
          renderRow={this._renderCell}
      	  // renderFooter={this._renderFooter}
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

module.exports = SubjectPage;
