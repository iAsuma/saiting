// pages/index/sh.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    choosed:{
      type:String
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
    openChoose: function () {
      wx.navigateTo({
        url: '../choose/choose',
      })
    },
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
    limitInput: function(e){
      var value = e.detail.value
      var value_arr = value.split('.')
      if (value_arr.length > 2 || (value_arr.length > 1 && value_arr[1].length > 2) ){
        var index = value.indexOf('.')
        return value.slice(0, index+2)
      }
    }
  }
})