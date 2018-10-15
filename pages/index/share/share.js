// pages/index/shared/shared.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmp:1,
    choosed: { fullname:'请选择车位'},
    wxApp: app.globalData
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  switchTab: function(e){
    var tab = e.currentTarget.dataset.tab
    this.setData({
      tmp:tab,
      extab: tab == 1 ? 1 : ''
    })
  },
  buttonChangeTab:function(e){
    var tab = e.detail.tab
    this.setData({
      tmp: tab,
      extab: tab == 1 ? 1 : ''
    })
  },
  selectCarPlace:function(res){
    res.fullname = res.name + '-' + res.num
    this.setData({
      choosed:res
    })
  }
})