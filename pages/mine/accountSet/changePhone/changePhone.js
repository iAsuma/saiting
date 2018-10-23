// pages/mine/acountMes/changePone/changePhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    btnClass: 'no-can-get',
    inputPhone:'',
    can:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.phone){
      this.setData({
        phone: options.phone
      })
    }
  },
  getInputPhone: function (e) {
    if (e.detail.value.length != 0) {
      this.setData({
        inputPhone: e.detail.value,
        can: 1,
        btnClass: 'can-get'
      })
    } else {
      this.setData({
        can: 0,
        btnClass: 'no-can-get'
      })
    }
  },
  nextGetCode:function(e){
    if (e.currentTarget.dataset.can != 1) {
      return false;
    }

    var phoneFormat = /^(((13[0-9]{1})|(14[567]{1})|(15[0-9]{1})|(16[568]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[89]{1})){1}\d{8})$/;
    if (!phoneFormat.test(this.data.inputPhone)) {
      tips('请输入正确的11位手机号');
      return false;
    }

    wx.navigateTo({
      url: '../phoneCode/phoneCode?phone='+this.data.inputPhone,
    })
  }
})

function tips(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}