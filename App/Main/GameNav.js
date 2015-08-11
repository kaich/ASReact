'use strict'

var React = require('react-native');
var AppPage = require('./AppPage')
var AppDetailPage = require('./AppDetailPage')
var SubjectAppListPage = require('./SubjectAppListPage')
var TypeAppListPage = require('./TypeAppListPage')
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

var {
  Navigator,
  StyleSheet,
  Text,
  View,
} = React;

var subjectDetailURL = "http://ios3.app.i4.cn/getAppList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&isAuth=1&sort=2&remd=2&isjail=0&toolversion=521"

var typePageUrls = [
"http://ios3.app.i4.cn/getAppList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&isAuth=1&sort=&remd=74&specialid=0&isjail=0&toolversion=521",
"http://ios3.app.i4.cn/getAppList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&isAuth=1&sort=&remd=72&specialid=0&isjail=0&toolversion=521",
"http://ios3.app.i4.cn/getAppList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&isAuth=1&sort=&remd=71&specialid=0&isjail=0&toolversion=521",
"http://ios3.app.i4.cn/getAppList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&isAuth=1&remd=8&specialid=0&isjail=0&toolversion=521",
];


var pageUrls = ["http://ios3.app.i4.cn/getAppList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&isAuth=1&sort=2&remd=3&specialid=0&isjail=0&toolversion=521",
"http://ios3.app.i4.cn/getSpecialList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&sort=2&toolversion=521&isAuth=1&isjail=0&toolversion=521",
"",
"http://ios3.app.i4.cn/getAppList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&isAuth=1&sort=2&remd=5&specialid=0&isjail=0&toolversion=521",
"http://ios3.app.i4.cn/getAppTypeList.xhtml?sort=2&idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521"];

var rankPageUrls = [
"http://ios3.app.i4.cn/getAppList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&isAuth=1&sort=2&remd=44&specialid=0&type=&isjail=0&toolversion=521",
"http://ios3.app.i4.cn/getAppList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&isAuth=1&sort=2&remd=42&specialid=0&type=&isjail=0&toolversion=521",
"http://ios3.app.i4.cn/getAppList.xhtml?idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=D3D963E1-3581-4235-A3EE-20486BE17AFA&openudid=b8e13b8946a55ef1ac35df5362cf94bb4b59228e&osversion=8.0&udid=(null)&macaddress=(null)&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&isAuth=1&sort=2&remd=41&specialid=0&type=&isjail=0&toolversion=521",
];


var GameNav = React.createClass({

  renderScene: function(route, nav) {
    switch(route.id)
    {
      case 'detail':
      return (<AppDetailPage app={route.app}/>)
      case 'subject_detail':
      return (
              <SubjectAppListPage
              url={subjectDetailURL}
              subject={route.subject}
              navigator={nav}
              title="游戏专题"
              />
            )
    case 'type_detail':
    return (
       <TypeAppListPage
       pages={typePageUrls}
       appType={route.appType}
       segmentTitles={["流行","周榜","总榜","最新"]}
       navigator={nav}
       />
    )
      default :
      return (
        <AppPage
        message={route.message}
        needLoadData={true}
        navigator={nav}
        pageUrls={pageUrls}
        rankPageUrls={rankPageUrls}
        />
      );
    }
  },

  render: function()
  {
    return (
      <Navigator
      style={styles.container}
      initialRoute={{ message: "APP Main Scene", }}
      renderScene={this.renderScene}
      configureScene={(route) => {
	if (route.sceneConfig) {
	  return route.sceneConfig;
	}
	return Navigator.SceneConfigs.FloatFromBottom;
      }}
      />
    );
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = GameNav;
