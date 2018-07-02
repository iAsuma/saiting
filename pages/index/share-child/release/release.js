// pages/index/sh.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    choosed:{
      type:String,
      observer: function (newVal, oldVal, changedPath) {
        console.log(newVal)
        console.log(oldVal)
      }
    },
    
  },
  data: {
    array: ['xx', 'xx1', 'xx2', 'xx3'],
    index: 0,
    date: '2016-09-01',
    time: '12:01',
  },
  ready:function(){
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
    bindDateChange: function (e) {
      this.setData({
        date: e.detail.value
      })
    },
    bindTimeChange: function (e) {
      this.setData({
        time: e.detail.value
      })
    },
    openChoose:function(){
      wx.navigateTo({
        url: '../choose/choose',
      })
    }
  }
})