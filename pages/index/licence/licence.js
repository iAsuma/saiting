// pages/index/licence/licence.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plateShow: false,
    initPlate: '苏',
    licenceImg: '/res/images/jsz.png',
    isUpload: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindPlateSelect: function () {
    this.setData({
      plateShow: true
    })
  },
  donePlate: function (e) {
    this.setData({
      plateShow: false,
      initPlate: e.detail.text
    })
  },
  cancelPlate: function (e) {
    this.setData({
      plateShow: false
    })
  },
  bindListenInput: function (e) {
    return e.detail.value.toUpperCase().replace(/\s+/g, '')
  },
  uploadImage: function (e) {
    var _this = this;
    wx.chooseImage({
      count: 2,
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://192.168.31.237/tp50/public/index/index/upd', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
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
  }
})