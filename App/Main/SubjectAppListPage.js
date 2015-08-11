'use strict';

var React = require('react-native');
var BaseAppListPage = require('./BaseAppListPage')
var TopNavBar = require('./TopNavBar')

var {
  AppRegistry,
  View,
} = React;

var LISTVIEW = 'ListView';


var DOMParser = require('xmldom').DOMParser

var SubjectAppListPage = React.createClass({
  render: function() {
    return (
      <View style={{flex:1,backgroundColor:'#ffffff'}}>
        <BaseAppListPage
        url={this.props.url + "&specialid=" + this.props.subject.id} navigator={this.props.navigator}
        needLoadData={true}
        automaticallyAdjustContentInsets={true}>
          <TopNavBar title={this.props.title}/>
        </BaseAppListPage>
      </View>
    );
  }
});


module.exports = SubjectAppListPage;
