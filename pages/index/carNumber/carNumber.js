// pages/index/licence/licence.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    initPlate:'苏',
    licenceImg:'/res/images/jsz.png',
    isUpload:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  bindPlateSelect:function(){
    this.setData({
      show:true
    })
  },
  donePlate: function(e){
    this.setData({
      show: false,
      initPlate: e.detail.text
    })
  },
  cancelPlate:function(e){
    this.setData({
      show: false
    })
  },
  bindListenInput:function(e){
    return e.detail.value.toUpperCase().replace(/\s+/g, '')
  }
})
