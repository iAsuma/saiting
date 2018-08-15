const loginUrl = 'http://icarcomhzp.tunnel.echomod.cn/mini/user/authLogin';
var app = getApp()
var from_page 
function tips(msg){
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}

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
  getPhoneNumber: function(e){
    console.log(e)
    if (e.detail.errMsg == 'getPhoneNumber:ok'){
      wx.getStorage({
        key: 'userAllData',
        success: function (sg) {
          wx.checkSession({
            success: function () {
              wx.request({
                data: { sessionId: app.globalData.sessionID, encryptedPhone: e.detail.encryptedData, ivPhone: e.detail.iv, encryptedUser: sg.data.enStr.encryptedData, ivUser: sg.data.enStr.iv,mark:0},
                method: 'POST',
                header: {
                  'content-type': 'application/json',
                  'token': app.globalData.apiToken
                },
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
                  }else{
                    tips('登录失败，请稍后重试')
                  }
                }
              });
            },
            fail: function () {
              wx.login({
                success: function (lg) {
                  if (lg.code) {
                    wx.request({
                      data: { code: lg.code, encryptedPhone: e.detail.encryptedData, ivPhone: e.detail.iv, encryptedUser: sg.data.enStr.encryptedData, ivUser: sg.data.enStr.iv, mark: 1},
                      method: 'POST',
                      header: {
                        'content-type': 'application/json',
                        'token': app.globalData.apiToken
                      },
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
                        }else{
                          tips('登录失败，请稍后重试')
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