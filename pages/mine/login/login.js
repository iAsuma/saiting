// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  getPhoneNumber: function(e){
    console.log(e)
    
    wx.checkSession({
      success:function(e){
        console.log(e)
      },
      fail:function(e){
        wx.login({
          success: function (res) {
            console.log(res)
            if (res.code) {
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx0b92d7a075f48460&secret=50087c6e52e76abd658714bd716adf85&js_code=' + res.code + '&grant_type=authorization_code',
                success: function (res) {
                  wx.navigateBack()
                }
              })
            }
          }
        })
      }
    })
  }
})