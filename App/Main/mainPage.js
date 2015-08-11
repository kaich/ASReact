'use strict';

var React = require('react-native');
var BaseAppListPage = require('./BaseAppListPage')

var {
  AppRegistry,
  View,
} = React;

var LISTVIEW = 'ListView';


var  url = "http://ios3.app.i4.cn/getAppList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=6C0D5033-B308-4FD1-9BA1-A45CE9751A5C&openudid=97d9b4481ff739f83c017f319f715b714c288322&osversion=8.0&udid=(null)&macaddress=020000000000&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&isAuth=1&type=0&remd=1&specialid=0&isjail=0&toolversion=521"

var DOMParser = require('xmldom').DOMParser

var MainPage = React.createClass({
  render: function() {
    return (
      <BaseAppListPage
      url={url}
      needLoadData={true}
      automaticallyAdjustContentInsets={true}
      navigator={this.props.navigator}/>
    );
  }
});


module.exports = MainPage;
