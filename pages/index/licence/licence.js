// pages/index/licence/licence.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmp : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
      }
    })
  },
  bindPlateSelect:function(){
    this.setData({
      tmp:1
    })
  }
})
