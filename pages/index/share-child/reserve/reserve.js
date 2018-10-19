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
    extab: Number,
    wxapp: Object
  },
  /**
   * 组件的初始数据
   */
  data: {
    swiper: { dots: true, active_color: '#FF464A' },
    recList:[],
    location: { city: '', address: '', lat: '',lng: ''},
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
    wx.request({
      data: {},
      method: 'POST',
      header: {
        'sessionid': app.globalData.sessionID
      },
      url: _this.data.wxapp.apiPre + '/mini/share/all/optimal',
      success: function (res) {        
        if (res.statusCode == 200 && res.data.code == '100' && res.data.result.length > 0){
          for(var i in res.data.result){
            res.data.result[i].stime = util.dateNeed(new Date(dateForIos(res.data.result[i].beginTime)))
            res.data.result[i].etime = util.dateNeed(new Date(dateForIos(res.data.result[i].endTime)))
          }
          
          _this.setData({
            recList: res.data.result
          })
        }
      }
    });

    if (this.properties.extab != 1){
      lbs.reverseGeocoder({
        coord_type: 5,
        success: function (res) {
          if (res.status == 0) {
            _this.setData({
              'location.city': res.result.address_component.city,
              'location.address': res.result.formatted_addresses.recommend,
              'location.lat': res.result.location.lat,
              'location.lng': res.result.location.lng
            })
            wx.setStorageSync('now_where', {
              'city': res.result.address_component.city,
              'address': res.result.formatted_addresses.recommend,
              'lat': res.result.location.lat,
              'lng': res.result.location.lng
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
            'location.address': res.data.address,
            'location.lat': res.data.lat,
            'location.lng': res.data.lng
          })
        }
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    todetail:function(e){
      wx.navigateTo({
        url: '../sharePlaceDetail/sharePlaceDetail?shareId=' + e.currentTarget.dataset.shareid,
      })
    },
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
      console.log(params)
      if(params != '' && params != 'undefined'){
        wx.navigateTo({
          url: '../sharePlaceList/sharePlaceList?'+params,
        })
      }
    },
    changeFatherTap:function(){
      this.triggerEvent('changetab', {tab:2})
    }
  }
})
