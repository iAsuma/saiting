const util = require('../../../../utils/util.js')
const nowDate = new Date()
const someDate = new Date(nowDate.getTime() + 2 * 60 * 60 * 1000);
var startDate = util.dateNeed(nowDate)
var endDate = util.dateNeed(someDate)

const minus = (s, e) => {
  var res = parseInt(e.getTime() - s.getTime()) / (60 * 60 * 1000)
  return Math.round((res * 10)) / 10
}
const dateForIos = date => {
  return date.replace(/-/g, '/')
}

const app = getApp()
var QQMapWX = require('../../../../libs/qqmap-wx-jssdk.min.js');
var config = require('../../../../libs/config.js');
var lbs = new QQMapWX({
  key: config.Config.QQMapKey // 必填
});

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    extab: Number
  },
  /**
   * 组件的初始数据
   */
  data: {
    swiper: { dots: true, active_color: '#FF464A' },
    location:{city:'', address: ''},
    initdate:{
      limitS: startDate,
      limitE: endDate,
      start: startDate,
      end: endDate,
      distance: minus(nowDate, someDate)
    }
  },
  attached: function (e) {
    var _this = this;
    if (this.properties.extab != 1){
      lbs.reverseGeocoder({
        coord_type: 5,
        success: function (res) {
          if (res.status == 0) {
            _this.setData({
              'location.city': res.result.address_component.city,
              'location.address': res.result.formatted_addresses.recommend
            })
            wx.setStorageSync('now_where', {
              'city': res.result.address_component.city,
              'address': res.result.formatted_addresses.recommend
            })
          }
        }
      });
    }else{
      wx.getStorage({
        key: 'now_where',
        success: function (res) {
          _this.setData({
            'location.city': res.data.city,
            'location.address': res.data.address
          })
        }
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindStartDateChange:function(e){
      let start = new Date(dateForIos(e.detail.value + ' ' + this.data.initdate.start[3]))
      let end = new Date(start.getTime() + 2 * 60 * 60 * 1000)
      
      this.setData({
        'initdate.start': util.dateNeed(start),
        'initdate.end': util.dateNeed(end),
        'initdate.distance': minus(start, end)
      })
    },
    bindStartTimeChange:function(e){
      let start = new Date(dateForIos(this.data.initdate.start[0] + '-' +this.data.initdate.start[1] + ' ' + e.detail.value))
      let end = new Date(dateForIos(this.data.initdate.end[0] + '-' +this.data.initdate.end[1] + ' ' + this.data.initdate.end[3]))
      
      this.setData({
        'initdate.start': util.dateNeed(start),
        'initdate.end': util.dateNeed(end),
        'initdate.distance': minus(start, end)
      })
    },
    bindEndDateChange: function (e) {
      let start = new Date(dateForIos(this.data.initdate.start[0] + '-' +this.data.initdate.start[1] + ' ' + this.data.initdate.start[3]))
      let end = new Date(dateForIos(e.detail.value + ' ' + this.data.initdate.end[3]))
      
      this.setData({
        'initdate.start': util.dateNeed(start),
        'initdate.end': util.dateNeed(end),
        'initdate.distance': minus(start, end)
      })
    },
    bindEndTimeChange: function (e) {
      let start = new Date(dateForIos(this.data.initdate.start[0] + '-' +this.data.initdate.start[1] + ' ' + this.data.initdate.start[3]))
      let end = new Date(dateForIos(this.data.initdate.end[0] + '-' +this.data.initdate.end[1] + ' ' + e.detail.value))
      
      this.setData({
        'initdate.start': util.dateNeed(start),
        'initdate.end': util.dateNeed(end),
        'initdate.distance': minus(start, end)
      })
    },
    formSubmit: function(e){
      var form_data = e.detail.value
      var params = Object.keys(form_data).map(function (key) {
        return key + "=" + form_data[key];
      }).join("&");
      if(params != '' && params != 'undefined'){
        wx.navigateTo({
          url: '../carList/carList?'+params,
        })
      }
    }
  }
})
