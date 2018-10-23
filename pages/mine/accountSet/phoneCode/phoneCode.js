// pages/mine/acountMes/poneCode/poneCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof (options.phone) != 'undefined' && options.phone != '' && options.phone.length == 11){
      this.setData({
        phone:options.phone
      })
    }
  }
})