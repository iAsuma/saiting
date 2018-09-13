// pages/index/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hidden:true, //不可改为false
    collect:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.fistform)
    this.setData({
      collect: JSON.parse(options.fistform)
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  releaseSubmit:function(e){
    console.log(e)
  }

})