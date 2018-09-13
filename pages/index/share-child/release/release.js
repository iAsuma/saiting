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
    date: '',
    stime: '',
    etime: '',
    price: ''
  },
  ready:function(){
    var nowtime = util.dateNeed(new Date());
    this.setData({
      date: nowtime[0] + '-' +nowtime[1],
      stime: nowtime[3],
      etime: '请选择离开时间'
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
    bindsTimeChange: function (e) {
      this.setData({
        stime: e.detail.value
      })
    },
    limitInput: function(e){
      var value = e.detail.value
      var value_arr = value.split('.')
      if (value_arr.length > 2 || (value_arr.length > 1 && value_arr[1].length > 2) ){
        var index = value.indexOf('.')
        return value.slice(0, index+2)
      }
    },
    nextOpt:function(){
      console.log(this.data)
      let needForm = {}
      needForm.psid = this.data.choosed.psid
      needForm.plid = this.data.choosed.plid
      needForm.startdate = this.data.date
      needForm.starttime = this.data.stime
      needForm.endtime = this.data.etime
      
      console.log(needForm.psid)
      if (typeof (needForm.psid) == 'undefined'){
        return;
      }

      let firstform = JSON.stringify(needForm)
      
      wx.navigateTo({
        url: '../publish/publish?fistform='+firstform,
      })
    }
  }
})