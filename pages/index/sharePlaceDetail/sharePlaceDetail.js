const app = getApp()
const detailUrl = app.globalData.apiPre + '/mini/share/show';
const shareId = '63136b98-5bea-4f31-b06f-305b0b8bb118'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/res/images/banner1.jpg',
      '/res/images/banner1.jpg',
      '/res/images/banner1.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    fromSelf:false,
    detail:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.shareId = '63136b985bea4f31b06f305b0b8bb118'
    options.from_page = 1
    var _this = this;
    if (options.from_page == 1){
      _this.setData({
        fromSelf:true
      })
    }

    if (options.shareId){
      wx.request({
        data: { shareId:options.shareId},
        method: 'POST',
        header: {
          'sessionid': app.globalData.sessionID,
        },
        url: detailUrl,
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200 && res.data.code == 100){
            _this.setData({
              detail:res.data.result
            })
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
