// pages/index/map/map.js
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');
var config = require('../../../libs/config.js');
var lbs = new QQMapWX({
  key: config.Config.QQMapKey // 必填
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:'',
    markers:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })

    lbs.reverseGeocoder({
      coord_type: 5,
      success: function (res) {
        console.log(res.result.location.latitude)
        var marker = [{
          id: 0,
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          iconPath: '/res/icons/positioning.png',
          width: 22,
          height: 32
        }]
        _this.setData({
          markers: marker
        });
        console.log(res)
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})