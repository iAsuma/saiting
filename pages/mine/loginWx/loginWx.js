const loginUrl = 'https://test.icarcom.cn/miniPrograms/mini/user/phoneLogin';
const codeUrl = 'https://test.icarcom.cn/miniPrograms/mini/user/getValidCode';
var from_page ;
var isCountdown = 0;
var app = getApp();
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
    can: 0,
    btnStr: '获取验证码',
    btnClass: 'no-can-get',
    inputPhone: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    from_page = options.from_page
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload:function(){
    wx.removeStorageSync('vcode')//移除缓存中的验证码
  },
  getInputPhone:function(e){
    if (isCountdown == 1){
      return ;
    }
    if (e.detail.value.length == 11){
      this.setData({
        inputPhone: e.detail.value,
        can: 1,
        btnClass: 'can-get'
      })
    }else{
      this.setData({
        can: 0,
        btnClass: 'no-can-get'
      })
    }
  },
  getValidCode: function(){
    var phoneFormat = /^(((13[0-9]{1})|(14[567]{1})|(15[0-9]{1})|(16[568]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[89]{1})){1}\d{8})$/;
    if (!phoneFormat.test(this.data.inputPhone)) {
      tips('请输入正确的11位手机号');
      return false;
    }

    this._getValidCodeFromApi();

    var currentTime = 59
    var _this = this;

    _this.setData({
      btnClass: 'no-can-get',
      can:0
    })
    isCountdown = 1;
    var interval = setInterval(function(){
      _this.setData({
        btnStr: '剩余 '+ currentTime -- +' s'
      })
      if (currentTime < -1) {
        clearInterval(interval)
        isCountdown = 0
        _this.setData({
          btnStr: '重新发送',
          btnClass: 'can-get',
          can: 1
        })
      }
    },1000)
  },
  _getValidCodeFromApi:function(){
    var _this = this
    wx.request({
      data: { phone: _this.data.inputPhone, msg:'【赛停(小程序)】'},
      method: 'POST',
      header: {
        'token': app.globalData.apiToken
      },
      url: codeUrl,
      success: function (res) {
        if (res.statusCode == 200 && res.data.code == 100) {
          wx.setStorage({
            key: "vcode",
            data: res.data.result,
            success: function(){
              tips('发送成功')
            }
          })
        } else {
          tips('发送失败')
          return false;
        }
      }
    });
  },
  loginByPhone:function(e){
    if (e.detail.value.phone == ''){
      tips('请输入手机号');
      return false;
    }
    if (e.detail.value.code == '' || e.detail.value.code.length != 6) {
      tips('请输入六位验证码');
      return false;
    }
    var vcode = wx.getStorageSync('vcode')
    if (vcode != e.detail.value.code){
      tips('验证码不正确');
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
                header: {
                  'token': app.globalData.apiToken
                },
                success: function (res) {
                  if (res.statusCode == 200 && typeof (res.data.phone) != 'undefined') {
                    app.globalData.userPhone = res.data.phone
                    app.globalData.sessionID = res.data.result
                    wx.setStorageSync('sessionId', res.data.result)
                    wx.setStorageSync('userPhone', res.data.phone)
                    wx.removeStorageSync('vcode')//移除缓存中的验证码
                    if (from_page == 1) {
                      var pages = getCurrentPages();
                      var prePage = pages[pages.length - 2]
                      prePage.changeData({ islogined: true })
                    }
                    wx.navigateBack()
                  } else if (res.data.code == '0107'){
                    tips('验证码错误，请重新获取')
                  } else {
                    tips('登录失败')
                  }
                }
              });
            }
          }
        })
      },
      fail: function () {
        tips('请打开设置授权用户信息')
      }
    })
  }
})