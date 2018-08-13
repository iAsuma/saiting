// pages/index/center/center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogined: false
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
    console.log(wx.canIUse('button.open-type.openSetting'))
  },
  loginOrReg:function(e){
    console.log(1)
    console.log(e)
    wx.navigateTo({
      url: 'login/login?from_page=1',
    })
  },
  onGotUserInfo:function(e){
    console.log(2)
    console.log(e)
    if (e.detail.errMsg == 'getUserInfo:ok'){
      wx.setStorageSync('userAllData', { userInfo: e.detail.userInfo, enStr: { encryptedData: e.detail.userInfo,iv:e.detail.iv}})
    }
  },
  changeData:function(data){
    this.setData({
      islogined: data.islogined
    })
  }
})