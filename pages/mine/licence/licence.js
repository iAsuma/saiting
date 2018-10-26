// pages/index/licence/licence.js
const app = getApp()
const upLicenceUrl = app.globalData.apiPre + '/mini/upload/car/permit';
const upCarPicUrl = app.globalData.apiPre + '/mini/upload/car/pic'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plateShow: false,
    initPlate: '苏',
    // letterNum:'',
    // keyboardShow:false,
    // cursor:'',
    // hidePlaceholder:false,
    numInput: '',
    codeInput: '',
    licenceBg1: '/res/images/xsz.png',
    licenceBg2: '/res/images/chepai.png',
    isUpload1: false,
    isUpload2: false,
    licenceImg1: '',
    licenceImg2: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 开启车牌键盘
   */
  bindPlateSelect: function () {
    this.setData({
      plateShow: true
    })
  },
  /**
   * 车牌键盘--完成事件
   */
  donePlate: function (e) {
    this.setData({
      plateShow: false,
      initPlate: e.detail.text
    })
  },
  /**
   * 车牌键盘--取消事件
   */
  cancelPlate: function (e) {
    this.setData({
      plateShow: false
    })
  },
  /**
   * 监听input输入
   */
  bindListenNumInput:function(e){
    let value = e.detail.value.toUpperCase().replace(/\s+/g, '')
    
    this.setData({
      numInput: value
    })
    
    return value
  },
  /**
   * 监听input输入
   */
  bindListenCodeInput: function (e) {
    let value = e.detail.value.toUpperCase().replace(/\s+/g, '')

    this.setData({
      codeInput: value
    })

    return value
  },
  /**
   * 唤起键盘
   */
  openInput: function (e) {
    this.setData({
      keyboardShow: true,
      cursor:'cursor-blink',
      hidePlaceholder:true
    })
  },
  /**
   * 字母数字键盘--输入事件
   */
  bindKeyInput:function(e){
    var value = e.detail.value
    if (this.data.letterNum.length >= 20){
      return;
    }

    this.setData({
      hidePlaceholder: true,
      letterNum: this.data.letterNum+value
    })
  },
  bindDeleteInput:function(){
    var old = this.data.letterNum
    var curr = old.length != 0 ? old.substring(0, old.length-1) : ''
    this.setData({
      hidePlaceholder: this.data.letterNum.length <= 1 ? false : true,
      letterNum: curr
    })
  },
  bindDoneInput:function(){
    this.setData({
      keyboardShow: false,
      hidePlaceholder: this.data.letterNum.length == 0 ? false : true,
      cursor: ''
    })
  },
  /**
   * 字母数字键盘--空白点击事件
   */
  hideKeyboard: function (e) {
    this.setData({
      keyboardShow: false,
      hidePlaceholder: this.data.letterNum.length == 0 ? false : true,
      cursor: ''
    })
  },
  uploadLicence: function (e) {
    var _this = this;
    if(_this.data.numInput == '' || _this.data.numInput.length < 6){
      tips('请输入正确的车牌号')
      return;
    }

    if (_this.data.codeInput == '' || _this.data.codeInput.length != 17) {
      tips('请输入正确的车辆识别号')
      return;
    }
    
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: upLicenceUrl, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'carPermitPic',
          header:{
            'sessionid': app.globalData.sessionID
          },
          formData: {
            'licensePlate': _this.data.initPlate + _this.data.numInput,
            'carIdentifier': _this.data.codeInput
          },
          success: function (res) {
            let resObj = JSON.parse(res.data)
            if (res.statusCode == 200 && resObj.code == 100){
              _this.setData({
                licenceImg1: tempFilePaths[0],
                isUpload1: true
              })
            }else{
              tips(resObj.msg)
            }
          }
        })
        
      }
    })
  },
  uploadImage: function (e) {
    var _this = this;
    if (_this.data.numInput == '' || _this.data.numInput.length < 6) {
      tips('请输入正确的车牌号')
      return;
    }

    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: upCarPicUrl, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'carPic',
          header: {
            'sessionid': app.globalData.sessionID
          },
          formData: {
            'licensePlate': _this.data.initPlate + _this.data.numInput
          },
          success: function (res) {
            let resObj = JSON.parse(res.data)
            if (res.statusCode == 200 && resObj.code == 100) {
              _this.setData({
                licenceImg2: tempFilePaths[0],
                isUpload2: true
              })
            } else {
              tips(resObj.msg)
            }
          }
        })

      }
    })
  },
  toNextSubmit:function(e){
    var pages = getCurrentPages();
    var prePage = pages[pages.length-2]
    prePage._getPlates()
    
    wx.navigateBack()
  }
})

function tips(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}