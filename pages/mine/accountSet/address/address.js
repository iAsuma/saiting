// pages/index/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['江苏省', '苏州市', '工业园区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})