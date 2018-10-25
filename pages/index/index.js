//获取应用实例
const app = getApp()
const nearDetailUrl = app.globalData.apiPre + '/mini/share/near/optimal';
Page({
  data: {
    imgUrls: [
      '/res/images/banner.png',
      '/res/images/head.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    ishidden:true,
    shareId:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var _this = this
    wx.getLocation({
      type: 'wgs84', 
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.request({
          data: { lng: longitude, lat: latitude},
          method: 'POST',
          header: {
            'sessionid': app.globalData.sessionID,
          },
          url: nearDetailUrl,
          success: function (rq) {
            if (rq.statusCode == 200 && rq.data.code == 100) {
              _this.setData({
                ishidden:false,
                shareId: rq.data.result.shareId
              })
            }
          }
        })
      }
    })
    
  },

  bindscan:function(){
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  }
})
