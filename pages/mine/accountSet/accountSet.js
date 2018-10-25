// pages/mine/acountMes/acountMes.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.sessionID == '') {
      wx.redirectTo({
        url: '../../mine/login/login',
      })
      return false;
    }
    this.setData({
      userInfo:{
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        phone: app.globalData.userPhone
      }
    })
  }
})