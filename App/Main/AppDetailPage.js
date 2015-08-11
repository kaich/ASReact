'use strict'

var React = require('react-native');
var BackBottomBar = require('./BackBottomBar')
var TopNavBar = require('./TopNavBar')
var Modal = require('react-native-modal');
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  LinkingIOS,
} = React;


var url = "http://ios3.app.i4.cn/appinfo.xhtml?rt=1&idfa=E2BFE50A-B48D-4700-A6DF-746E11E63724&idfv=6C0D5033-B308-4FD1-9BA1-A45CE9751A5C&openudid=97d9b4481ff739f83c017f319f715b714c288322&osversion=8.0&udid=(null)&macaddress=020000000000&model=iPhone7,1&certificateid=0&bundleid=0&isAuth=1&isjail=0&authtime=1433494495&serialnumber=C39N920QG5QR&cid=200025&toolversion=521&sort=0&specialid=0&type=0&remdorder=4&remd=1"

var DetailPage = React.createClass({
  mixins: [Modal.Mixin],
  getInitialState: function(){
     return {
       app: null,
     };
  },

  getDetail:function(){
    var finalUrl = url + "&pkagetype=" + this.props.app.pkagetype + "&appid=" + this.props.app.id
    fetch(finalUrl)
    .then(response => response.json())
    .then((appDetail) => {
      this.setState({
      	app: appDetail,
      	isDetailImageShow:false,
      })
    })
  },

  componentDidMount: function(){
    this.getDetail()
  },

  _enterDetailImagePage: function(){
    this.setState({isDetailImageShow: true});
  },

  _closeDtailImagePage: function(){
    this.setState({isDetailImageShow: false});
  },

  _onPressInstall: function(){
    var linkURL = "itms-services://?action=download-manifest&url=" + this.state.app.plist
    LinkingIOS.openURL(linkURL);
  },

  render: function() {
    if(this.state.app === null)
    return (<View></View>)
    return (
      <View style={styles.container}>
      <TopNavBar title="软件详情"/>
      <ScrollView style={{backgroundColor:'#ffffff',flex:1}}>
      <View style={styles.topSection}>
      <View style={{flexDirection:'row', paddingHorizontal:10,height:60}}>
      <Image style={styles.icon} source={{uri:this.state.app.Icon}}/>
      <View style={{marginLeft:10}}>
      <Text style={{marginTop:10,fontSize:14,color:'#333333'}}>{this.state.app.AppName}</Text>
      <Text style={{marginTop:10,fontSize:12,color:'#999999'}}>{this.state.app.shortshortnote}</Text>
      </View>
      <TouchableHighlight style={styles.button} onPress={this._onPressInstall}>
      <Text style={{color:'#ffffff',}}>安装</Text>
      </TouchableHighlight>
      </View>
      <View style={styles.borderViewContainer}>
      <View style={styles.borderView}>
      <Text style={styles.infoMainText}>{this.state.app.Version}</Text>
      <Text style={styles.infoSubText}>版本</Text>
      </View>
      <View style={styles.borderView}>
      <Text style={styles.infoMainText}>{this.state.app.Size}</Text>
      <Text style={styles.infoSubText}>大小</Text>
      </View>
      <View style={styles.borderView}>
      <Text style={styles.infoMainText}>{this.state.app.DownloadCount}</Text>
      <Text style={styles.infoSubText}>1.2.29</Text>
      </View>
      </View>
      <View style={{flex:1}}>
      <ScrollView  horizontal={true} style={styles.ImagesScrollView} contentInset={{top:-20,bottom:-30}} directionalLockEnabled={true}>
      {
        this.state.app.Image.map((url)=>(
          <TouchableHighlight underlayColor='#999999' onPress={this._enterDetailImagePage}>
          <Image style={{height:200,width:100,marginHorizontal:10,}} source={{uri : url}}/>
          </TouchableHighlight>
        ))
      }
      </ScrollView>
      </View>
      <View style={styles.seperator}/>
      </View>
      <View style={styles.secondSection}>
      <View style={styles.secondView}>
      <Text style={styles.secondHeader}>开发商</Text>
      <Text style={styles.secondContent}>{this.state.app.Company}</Text>
      </View>
      <View style={styles.secondView}>
      <Text style={styles.secondHeader}>类别</Text>
      <Text style={styles.secondContent}>{this.state.app.TypeName}</Text>
      </View>
      <View style={styles.secondView}>
      <Text style={styles.secondHeader}>更新日期</Text>
      <Text style={styles.secondContent}>{this.state.app.UpdateTime}</Text>
      </View>
      <View style={styles.secondView}>
      <Text style={styles.secondHeader}>语言</Text>
      <Text style={styles.secondContent}>{this.state.app.Language}</Text>
      </View>
      <View style={styles.secondView}>
      <Text style={styles.secondHeader}>系统需求</Text>
      <Text style={styles.secondContent}>需要IOS{this.state.app.MinVersion}或以上版本</Text>
      </View>
      <View style={styles.seperator}/>
      </View>
      <View>
      <Text style={styles.appNote}>{this.state.app.LongNote.replace(/<br \/>/g,"")}</Text>
      </View>
      </ScrollView>
      <Modal isVisible={this.state.isDetailImageShow} forceToFront={true} hideCloseButton={true} onClose={this._closeDtailImagePage} containerPointerEvents='box-none' onPressBackdrop={this._closeDtailImagePage}>
      <ScrollView
       horizontal={true}
       style={styles.DetailImagesScrollView}
       directionalLockEnabled={true}
       pagingEnabled={true}
       automaticallyAdjustContentInsets={true}
       centerContent={true}>
      {
        this.state.app.Image.map((url)=>(
          <TouchableHighlight style={{width:100*vw,height:100*vh,backgroundColor:'transparent',justifyContent:'center'}} underlayColor='transparent' onPress={this._closeDtailImagePage}>
          <Image style={{height:75*vh,width:100*vw-100,backgroundColor:'transparent',marginHorizontal:50}} source={{uri : url}}/>
          </TouchableHighlight>
        ))
      }
      </ScrollView>
      </Modal>
      </View>
    );
  }, });

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  topSection:{
    flexDirection:'column',
  },
  icon:{
    height:60,
    width:60,
  },
  button:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#008aff',
    marginTop:15,
    position:'absolute',
    right:10,
    height:30,
    width:50,
  },
  borderViewContainer:{
    flex:1,
    flexDirection:'row',
    marginHorizontal:10,
    height:40,
    marginVertical:20,
    borderWidth:1,
    borderRightWidth:0,
    borderColor:'#999999',

  },
  borderView:{
    flex:1,
    borderRightWidth:1,
    borderColor:'#999999',
    justifyContent:'center',
    alignItems:'center',
  },
  infoMainText:{
    fontSize:12,
  },
  infoSubText:{
    fontSize:11,
    color: '#666666',
  },
  ImagesScrollView:{
    height:220,
  },
  DetailImagesScrollView:{
    backgroundColor:'transparent',
    height:100*vh,
    width:100*vw,
    borderWidth:0,
  },
  seperator:{
    height:10,
    backgroundColor:'#eeeeee',
  },
  secondSection:{
    height:150,
    flexDirection:'column',
  },
  secondView:{
    flexDirection:'row',
    justifyContent:'flex-start'
  },
  secondHeader:{
    fontSize:12,
    width:50,
    textAlign:'right',
    color:'#666666',
    marginVertical:5,
  },
  secondContent:{
    fontSize:12,
    textAlign:'left',
    marginLeft:10,
    color:'#333333',
    marginVertical:5,
  },
  appNote:{
    fontSize:12,
    color:'#666666',
    marginBottom:10,
  },
});

module.exports = DetailPage;
