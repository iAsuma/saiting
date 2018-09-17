const util = require('../../../../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    choosed:{
      type: Object
    },
  },
  data: {
    index: 0,
    date: '请选择共享日期',
    stime: '请选择开始时间',
    etime: '请选择离开时间',
    uprice: ''
  },
  ready:function(){
    var nowtime = util.dateNeed(new Date());
    this.setData({
      date: nowtime[0] + '-' +nowtime[1],
      stime: nowtime[3]
    })
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
      this.setData({
        index: e.detail.value
      })
    },
    bindDateChange: function (e) {
      this.setData({
        date: e.detail.value
      })
    },
    bindsTimeChange: function (e) {
      this.setData({
        stime: e.detail.value
      })
    },
    bindeTimeChange:function(e){
      this.setData({
        etime: e.detail.value
      })
    },
    limitInput: function(e){
      var value = e.detail.value
      var value_arr = value.split('.')
      if (value_arr.length > 2 || (value_arr.length > 1 && value_arr[1].length > 2) ){
        var index = value.indexOf('.')
        return value.slice(0, index+2)
      }

      this.setData({
        uprice: e.detail.value
      })
    },
    nextOpt:function(){
      let needForm = {}
      needForm.psid = this.data.choosed.psid
      needForm.plid = this.data.choosed.plid
      needForm.startdate = this.data.date
      needForm.starttime = this.data.stime
      needForm.endtime = this.data.etime
      needForm.unitPrice = this.data.uprice
      
      if (typeof (needForm.psid) == 'undefined' || needForm.psid == '请选择车位'){
        tips('请选择车位')
        return;
      }

      if (typeof (needForm.startdate) == 'undefined' || needForm.startdate == '请选择共享日期') {
        tips('请选择共享日期')
        return;
      }

      if (typeof (needForm.starttime) == 'undefined' || needForm.starttime == '请选择开始时间') {
        tips('请选择开始时间')
        return;
      }

      if (typeof (needForm.endtime) == 'undefined' || needForm.endtime == '请选择离开时间') {
        tips('请选择离开时间')
        return;
      }

      if (needForm.starttime > needForm.endtime){
        tips('开始时间不能大于离开时间')
        return;
      }

      if (needForm.uprice == ''){
        tips('请设置单价')
        return;
      }else if(needForm.uprice > 100){
        tips('单价设置过高')
        return;
      }

      let firstform = JSON.stringify(needForm)
      
      wx.navigateTo({
        url: '../placeShareRule/placeShareRule?fistform='+firstform,
      })
    }
  }
})

function tips(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}