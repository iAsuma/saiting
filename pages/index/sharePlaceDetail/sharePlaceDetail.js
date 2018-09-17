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
    console.log(options)
    if (options.from_page == 1){
      console.log(2)
      this.setData({
        fromSelf:true
      })
    }

    var _this = this;

    if (options.shareId){
      wx.request({
        data: { shareId:options.shareId},
        method: 'POST',
        header: {
          'sessionid': app.globalData.sessionID,
        },
        url: parkUrl,
        success: function (res) {
          let listArr = res.data.result
          let list_len = listArr.length
          if (res.statusCode == 200 && Array.isArray(listArr) && list_len > 0) {
            for (var i = 0; i < list_len; i++) {
              listArr[i].pic = listArr[i].pic.split('|');
            }
            _this.setData({
              none: false,
              lists: res.data.result
            })
          } else {
            _this.setData({
              none: true
            })
          }
        }
      });
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
