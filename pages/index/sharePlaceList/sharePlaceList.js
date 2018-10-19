const util = require('../../../utils/util.js')
const app = getApp()
const listUrl = app.globalData.apiPre + '/mini/share/find/byLngLat';
const dateForIos = date => {
  return date.replace(/-/g, '/')
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fatherform:{},
    hidenone:false,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (JSON.stringify(options) != "{}"){
      let start = new Date(dateForIos(options.sdate + ' ' + options.stime))
      let startDate = util.dateNeed(start)
      let end = new Date(dateForIos(options.edate + ' ' + options.etime))
      let endDate = util.dateNeed(end)
      options.sdate_new = startDate[4]
      options.sweek = startDate[2]
      options.edate_new = endDate[4]
      options.eweek = endDate[2]
      var _this = this
      _this.setData({
        fatherform: options
      })
      
      wx.request({
        data: { 
          lng: options.lng, 
          lat: options.lat, 
          page: 1, 
          distance:20,
          beginTime: options.sdate + ' ' + options.stime,
          endTime: options.edate + ' ' + options.etime
        },
        method: 'POST',
        header: {
          'sessionid': app.globalData.sessionID
        },
        url: listUrl,
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200 && res.data.code == '100' && res.data.result.totalPages > 0) {
            _this.setData({
              hidenone: false,
              list: res.data.result.rows
            })
          }else{

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
  
  }
})