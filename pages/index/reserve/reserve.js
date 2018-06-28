// pages/index/sh.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    swiper: { dots: true, active_color: '#FF464A' }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getLocation: function (e) {
      //console.log(e)
      this.triggerEvent('myevent')
      wx.getLocation({
        type: '',
        altitude: true,
        success: function (res) { 
          //console.log(res)
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
})
