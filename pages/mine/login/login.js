var app = getApp()
const loginUrl = app.globalData.apiPre +'/mini/user/authLogin';
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
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.openSetting')//openSetting基础库版本为2.0以上，满足了此版本已适合大部分需求
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    from_page = options.from_page
    var _this = this
    var user = wx.getStorageSync('userAllData')
    if (typeof user == 'undefined' || user == ""){
      _this.setData({
        hasUserInfo : false
      })
    }else{
      _this.setData({
        hasUserInfo: true
      })
    }
  },
  onGotUserInfo: function (e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      wx.setStorageSync('userAllData', { userInfo: e.detail.userInfo, enStr: { encryptedData: e.detail.encryptedData, iv: e.detail.iv } })
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        layershow: true
      })
    } else {
      wx.switchTab({
        url: '../mine',
      })
    }
  },
  cancelAuthPhone:function(){
    let jumpUrl = ''
    if (from_page) {
      jumpUrl = '../loginPhone/loginPhone?from_page=' + from_page
    } else {
      jumpUrl = '../loginPhone/loginPhone'
    }
    wx.redirectTo({
      url: jumpUrl,
    })
  },
  sureAuthPhone:function(){
    this.setData({
      layershow: false
    })
  },
  getPhoneNumber: function(e){
    if (e.detail.errMsg == 'getPhoneNumber:ok'){
      wx.getStorage({
        key: 'userAllData',
        success: function (sg) {
          wx.checkSession({
            success: function () {
              wx.request({
                data: { sessionid: app.globalData.sessionID, encryptedPhone: e.detail.encryptedData, ivPhone: e.detail.iv, encryptedUser: sg.data.enStr.encryptedData, ivUser: sg.data.enStr.iv,mark:0},
                method: 'POST',
                header: {
                  'content-type': 'application/json',
                  'token': app.globalData.apiToken
                },
                url: loginUrl,
                success: function (res) {
                  if (res.statusCode == 200 && typeof (res.data.phone) != 'undefined') {
                    app.globalData.userPhone = res.data.phone
                    app.globalData.sessionID = res.data.result
                    wx.setStorageSync('sessionId', res.data.result)
                    wx.setStorageSync('userPhone', res.data.phone)
                    
                    var prePage = getCurrentPages()[0];
                    if (typeof prePage._changeData == 'function'){
                      prePage._changeData({ islogined: true })
                    }
                    
                    wx.navigateBack()
                  }else{
                    tips('登录失败')
                    wx.redirectTo({
                      url: '../loginPhone/loginPhone?from_page=' + from_page,
                    })
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
                          app.globalData.sessionID = res.data.result
                          wx.setStorageSync('sessionId', res.data.result)
                          wx.setStorageSync('userPhone', res.data.phone)

                          var prePage = getCurrentPages()[0];
                          if (typeof prePage._changeData == 'function') {
                            prePage._changeData({ islogined: true })
                          }

                          wx.navigateBack()
                        }else{
                          tips('登录失败')
                          wx.redirectTo({
                            url: '../loginPhone/loginPhone?from_page=' + from_page,
                          })
                        }
                      }
                    });
                  }
                }
              })
            }
          })
        },
        fail:function(){
          tips('请打开设置授权用户信息')
        }
      })
    }else{
      let jumpUrl = ''
      if (from_page){
        jumpUrl = '../loginPhone/loginPhone?from_page=' + from_page
      }else{
        jumpUrl = '../loginPhone/loginPhone'
      }
      wx.redirectTo({
        url: jumpUrl,
      })
    }
  }
})