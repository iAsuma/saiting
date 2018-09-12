// pages/index/licence/licence.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plateShow: false,
    initPlate: '苏',
    letterNum:'',
    keyboardShow:false,
    cursor:'',
    hidePlaceholder:false,
    licenceImg: '/res/images/jsz.png',
    isUpload: false
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
  bindListenInput:function(e){
    return e.detail.value.toUpperCase().replace(/\s+/g, '')
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
  uploadImage: function (e) {
    var _this = this;
    wx.chooseImage({
      count: 2,
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://192.168.1.132/tp50/public/index/index/upd', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'demo',
          formData: {
            'user': 'test'
          },
          fail: function (res) {
            console.log(res)
          },
          success: function (res) {
            console.log(res)
            var data = res.data
            //do something
          }
        })
        _this.setData({
          licenceImg: tempFilePaths[0],
          isUpload: true
        })
      }
    })
  },
  toNextSubmit:function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail)
    wx.redirectTo({
      url: '../carMesSure/carMesSure',
    })
  }
})