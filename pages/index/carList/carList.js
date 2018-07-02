const util = require('../../../utils/util.js')
const dateForIos = date => {
  return date.replace(/-/g, '/')
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fatherform:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (JSON.stringify(options) != "{}"){
      let start = new Date(dateForIos(options.sdate + ' ' + options.stime))
      let startDate = util.dateNeed(start)
      let end = new Date(dateForIos(options.edate + ' ' + options.etime))
      let endDate = util.dateNeed(end)
      options.sdate = startDate[4]
      options.sweek = startDate[2]
      options.edate = endDate[4]
      options.eweek = endDate[2]
      
      this.setData({
        fatherform: options
      })
    }
    
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