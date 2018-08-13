const loginUrl = 'http://192.168.31.237/tp50/public/index/index/firstlogin';
var app = getApp()
var from_page 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.openSetting')//openSetting基础库版本为2.0以上，满足了此版本已适合大部分需求
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    from_page = options.from_page
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  getPhoneNumber: function(e){
    if (e.detail.errMsg == 'getPhoneNumber:ok'){
      wx.getStorage({
        key: 'userAllData',
        success: function (sg) {
          wx.checkSession({
            success: function () {
              wx.request({
                data: { sessionId: app.globalData.sessionID, encryptedPhone: e.detail.encryptedData, encryptedUser: sg.data.enStr.encryptedData, iv: sg.data.enStr.iv,mark:0},
                method: 'POST',
                url: loginUrl,
                success: function (res) {
                  if (res.statusCode == 200 && typeof (res.data.phone) != 'undefined') {
                    app.globalData.userPhone = res.data.phone
                    wx.setStorageSync('userPhone', res.data.phone)
                    if (from_page == 1) {
                      var pages = getCurrentPages();
                      var prePage = pages[pages.length - 2]
                      prePage.changeData({ islogined: true })
                    }
                    wx.navigateBack()
                  }
                }
              });
            },
            fail: function () {
              wx.login({
                success: function (lg) {
                  if (lg.code) {
                    wx.request({
                      data: { code: lg.code, encryptedPhone: e.detail.encryptedData, encryptedUser: sg.data.enStr.encryptedData, iv: sg.data.enStr.iv, mark: 1},
                      method: 'POST',
                      url: loginUrl,
                      success: function (res) {
                        if (res.statusCode == 200 && typeof (res.data.phone) != 'undefined') {
                          app.globalData.userPhone = res.data.phone
                          app.globalData.sessionID = res.data.session_id
                          wx.setStorageSync('sessionId', res.data.session_id)
                          wx.setStorageSync('userPhone', res.data.phone)
                          if (from_page == 1) {
                            var pages = getCurrentPages();
                            var prePage = pages[pages.length - 2]
                            prePage.changeData({ islogined: true })
                          }
                          wx.navigateBack()
                        }
                      }
                    });
                  }
                }
              })
            }
          })
        }
      })
    }else{
      wx.redirectTo({
        url: '../loginWx/loginWx',
      })
    }
  }
})