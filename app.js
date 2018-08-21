//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)

    //从本地缓存中读取session和用户手机号
    this.globalData.sessionID = wx.getStorageSync('sessionId') || ''
    this.globalData.userPhone = wx.getStorageSync('userPhone') || ''

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
   
  },
  globalData: {
    userInfo: null,
    userPhone:'',
    sessionID: '',
    apiPre: 'http://icarcomhzp.tunnel.echomod.cn', //https://test.icarcom.cn/miniPrograms
    apiToken:'U9D3sCl99g92s9410lq3g15l43QbjJce74U9D3sClv9jKiuVjY1IyUR08'
  }
})