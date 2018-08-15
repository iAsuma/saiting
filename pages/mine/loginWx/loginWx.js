const loginUrl = 'http://icarcomhzp.tunnel.echomod.cn/mini/user/phoneLogin';
function tips(msg) {
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
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  loginByPhone:function(e){
    console.log(e.detail.value)
    console.log(e.detail.value.phone)
    if (e.detail.value.phone == ''){
      tips('请输入手机号');
      return false;
    }
    if (e.detail.value.code == '') {
      tips('请输入验证码');
      return false;
    }

    wx.getStorage({
      key: 'userAllData',
      success: function (sg) {
        wx.login({
          success: function (lg) {
            if (lg.code) {
              wx.request({
                data: { code: lg.code, phone: e.detail.value.phone, validCode: e.detail.value.code },
                method: 'POST',
                url: loginUrl,
                success: function (res) {
                  if (res.statusCode == 200 && typeof (res.data.phone) != 'undefined') {
                    app.globalData.userPhone = e.detail.value.phone
                    app.globalData.sessionID = res.data.session_id
                    wx.setStorageSync('sessionId', res.data.session_id)
                    wx.setStorageSync('userPhone', res.data.phone)
                    if (from_page == 1) {
                      var pages = getCurrentPages();
                      var prePage = pages[pages.length - 2]
                      prePage.changeData({ islogined: true })
                    }
                    wx.navigateBack()
                  } else {
                    wx.showToast({
                      title: '登录失败，请稍后重试',
                      icon: 'none',
                      duration: 2000
                    })
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