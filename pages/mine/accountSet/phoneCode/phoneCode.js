// pages/mine/acountMes/poneCode/poneCode.js
const app = getApp()
const codeUrl = app.globalData.apiPre + '/mini/user/getValidCode';
const changePhoneUrl = app.globalData.apiPre + '/mini/user/change/phone';
var isCountdown = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    canget: 0,
    timing:false,
    currentTime:60,
    clickStr:'获取验证码',
    candone:0,
    doneClass:'btn-gray'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof (options.phone) != 'undefined' && options.phone != '' && options.phone.length == 11){
      this.setData({
        phone:options.phone,
        canget:1
      })
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync('vcode')//移除缓存中的验证码
  },
  getInputCode:function(e){
    if (e.detail.value.length != 0) {
      this.setData({
        inputCode: e.detail.value,
        doneClass: 'btn-red',
        candone:1
      })
    } else {
      this.setData({
        inputCode: '',
        doneClass: 'btn-gray',
        candone: 0
      })
    }
  },
  getValidCode: function (e) {
    if (e.currentTarget.dataset.can != 1) {
      return false;
    }

    this._getValidCodeFromApi();

    var currentTime = 59
    var _this = this;

    _this.setData({
      canget: 0
    })
    isCountdown = 1;
    var interval = setInterval(function () {
      _this.setData({
        timing:true,
        currentTime: currentTime--
      })
      if (currentTime < 0) {
        clearInterval(interval)
        isCountdown = 0
        _this.setData({
          timing: false,
          clickStr: '重新获取',
          canget: 1
        })
      }
    }, 1000)
  },
  _getValidCodeFromApi: function (callback) {
    var _this = this
    wx.request({
      data: { phone: _this.data.phone, msg: '赛停(小程序)修改手机号' },
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
            success: function () {
              tips('发送成功')
              return true;
            }
          })
        } else {
          tips('发送失败')
          return false;
        }
      }
    });
  },
  doneBtn:function(e){
    if(e.currentTarget.dataset.can != 1){
      return false;
    }
    
    var _this = this
    var vcode = wx.getStorageSync('vcode')
    if (vcode != _this.data.inputCode) {
      tips('验证码不正确');
      return false;
    }
    
    wx.request({
      data: { oldPhone: _this.data.phone, newPhone: _this.data.phone, validCode: vcode},
      method: 'POST',
      header: {
        'sessionid': app.globalData.sessionID
      },
      url: changePhoneUrl,
      success: function (res) {
        if (res.statusCode == 200 && res.data.code == 100) {
          app.globalData.userPhone = res.data.result
          wx.setStorageSync('userPhone', res.data.phone)
          wx.removeStorageSync('vcode')//移除缓存中的验证码

          var prePage = getCurrentPages()[0];
          if (typeof prePage._changeData == 'function') {
            prePage._changeData({ islogined: true })
          }
          
          tips('修改成功',function(){
            wx.switchTab({
              url: '../../../mine/mine',
            })
          })
        } else {
          tips('修改失败')
          return false;
        }
      }
    });
  }
})

function tips(msg, cb) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
    success:function(){
      if(typeof cb == 'function') cb();
    }
  })
}