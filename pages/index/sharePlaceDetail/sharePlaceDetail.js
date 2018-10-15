const app = getApp()
const util = require('../../../utils/util.js')
const detailUrl = app.globalData.apiPre + '/mini/share/show';
const placeDetialUrl = app.globalData.apiPre + '/mini/parkSpace/detail';
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
    detail:{},
    detailInfo:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //options.shareId = '63136b985bea4f31b06f305b0b8bb118'
    //options.from_page = 1
    var _this = this;
    if (options.from_page == 1){
      _this.setData({
        fromSelf:true
      })
    }

    if (options.shareId){
      wx.showLoading({
        title:'加载中...'
      })
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
            res.data.result.punish = res.data.result.punish.split(/[;；]{1}/)
            let punishLen = res.data.result.punish.length
            for (var i = 0; i < punishLen;i++){
              if (i < punishLen-1){
                res.data.result.punish[i] += '；'
              }
            }

            let start = new Date(res.data.result.beginTimeStr)
            let end = new Date(res.data.result.endTimeStr)
            res.data.result.beginTimeStr = util.dateNeed(start)
            res.data.result.endTimeStr = util.dateNeed(end)
            res.data.result.minus = util.minus(start, end)

            _this.setData({
              detail:res.data.result
            })

            wx.request({
              data: { psId: res.data.result.psId },
              method: 'POST',
              header: {
                'sessionid': app.globalData.sessionID,
              },
              url: placeDetialUrl,
              success: function(rq){
                console.log(rq)
                if (rq.statusCode == 200 && rq.data.code == 100) {
                  let detailInfo = {
                    shareTimes: rq.data.result.shareTimes,
                    evaluation: rq.data.result.evaluation
                  }

                  detailInfo.remark = rq.data.result.remark.split(/[;；]{1}/)
                  let remarkLen = detailInfo.remark.length
                  for (var i = 0; i < remarkLen; i++) {
                    if (i < remarkLen - 1) {
                      detailInfo.remark[i] += '；'
                    }
                  }

                  detailInfo.pics = rq.data.result.pic.split('|')

                  _this.setData({
                    detailInfo: detailInfo
                  })
                  wx.hideLoading()
                }                
              }
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
  openMap:function(e){
    wx.openLocation({
      latitude: e.currentTarget.dataset.lat,
      longitude: e.currentTarget.dataset.lon,
      scale: 28,
      name: e.currentTarget.dataset.name,
      address: e.currentTarget.dataset.addr,
    })
  },
  openPhone:function(e){
    console.log(e)
    wx.makePhoneCall({
      phoneNumber:e.currentTarget.dataset.phone
    })
  },
  backLast:function(){
    wx.navigateBack()
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
