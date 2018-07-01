const util = require('../../../../utils/util.js')
const nowDate = new Date()
const someDate = new Date(nowDate.getTime() + 2 * 60 * 60 * 1000);
var startDate = util.dateNeed(nowDate)
var endDate = util.dateNeed(someDate)
const minus = (s, e) => {
  var res = parseInt(e.getTime() - s.getTime()) / (60 * 60 * 1000)
  return Math.round((res * 10)) / 10
}

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
    swiper: { dots: true, active_color: '#FF464A' },
    initdate:{
      limitS: startDate,
      limitE: endDate,
      start: startDate,
      end: endDate,
      distance: minus(nowDate, someDate)
    }
  },
  ready: function (e) {
    console.log(nowDate)
    console.log(util.formatTime(nowDate));
    console.log(util.dateNeed(nowDate));
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindStartDateChange:function(e){
      let start = new Date(e.detail.value + ' ' + this.data.initdate.start[3])
      let end = new Date(start.getTime() + 2 * 60 * 60 * 1000)

      this.setData({
        'initdate.start': util.dateNeed(start),
        'initdate.end': util.dateNeed(end),
        'initdate.distance': minus(start, end)
      })
    },
    bindStartTimeChange:function(e){
      let start = new Date(this.data.initdate.start[1] + ' ' + e.detail.value)
      let end = new Date(this.data.initdate.end[1] + ' ' + this.data.initdate.end[3])

      this.setData({
        'initdate.start': util.dateNeed(start),
        'initdate.end': util.dateNeed(end),
        'initdate.distance': minus(start, end)
      })
    }
  }
})
