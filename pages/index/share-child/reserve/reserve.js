const util = require('../../../../utils/util.js')
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
  ready: function (e) {
    console.log(new Date())
    console.log(util.formatTime(new Date()));
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
