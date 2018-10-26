const app = getApp()
const platesUrl = app.globalData.apiPre + '/mini/user/detail'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numslist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.sessionID == '') {
      wx.redirectTo({
        url: '../../mine/login/login',
      })
      return false;
    }
    
    this._getPlates()
  },
  addPlate:function(){
    wx.navigateTo({
      url: '../licence/licence',
    })
  },
  _getPlates:function(){
    var _this = this

    wx.request({
      data: {},
      method: 'POST',
      header: {
        'sessionid': app.globalData.sessionID
      },
      url: platesUrl,
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.code == 100) {
          _this.setData({
            numslist: res.data.result
          })
        }
      }
    });
  }
})