var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogined: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: null
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
  loginOrReg:function(e){
    wx.navigateTo({
      url: 'login/login?from_page=1',
    })
  },
  onGotUserInfo:function(e){
    if (e.detail.errMsg == 'getUserInfo:ok'){
      wx.setStorageSync('userAllData', { userInfo: e.detail.userInfo, enStr: { encryptedData: e.detail.encryptedData,iv:e.detail.iv}})
      app.globalData.userInfo = e.detail.userInfo
    }else{
      wx.navigateBack()
    }
  },
  changeData:function(data){
    this.setData({
      islogined: data.islogined,
      userInfo: { img: app.globalData.userInfo.avatarUrl, name: app.globalData.userInfo.nickName, phone:data.phone}
    })
  }
})