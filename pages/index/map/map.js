const app = getApp()
const listUrl = app.globalData.apiPre + '/mini/share/find/byLngLat';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:'',
    markers:[],
    nears:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var location = wx.getStorageSync('now_where');
    if(location){
      _this.setData({
        latitude: location.lat,
        longitude: location.lng
      })
      this._getAllPoints({ latitude: location.lat, longitude: location.lng})
    }else{
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          _this.setData({
            latitude: latitude,
            longitude: longitude
          })
          this._getAllPoints({ latitude: latitude, longitude: longitude })
        }
      })
    }
  },
  onReady:function(){
    var _this = this
    console.log(this.data.latitude)
    wx.request({
      data: {
        lng: _this.data.latitude,
        lat: _this.data.longitude,
        page: 1,
        distance: 10
      },
      method: 'POST',
      header: {
        'sessionid': app.globalData.sessionID
      },
      url: listUrl,
      success: function (res) {
        if (res.statusCode == 200 && res.data.code == '100' && res.data.result.totalPages > 0) {
          
          
        }
      }
    });
  },
  _getAllPoints:function(location){
    console.log(location)
    wx.request({
      data: {
        lng: location.latitude,
        lat: location.longitude,
        page: 0,
        distance: 10
      },
      method: 'POST',
      header: {
        'sessionid': app.globalData.sessionID
      },
      url: listUrl,
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.code == '100' && res.data.result.totalPages > 0) {
          var marker = []
          let points = res.data.result.rows
          for (var i = 0; i < points.length; i++) {
            marker[i] = {
              id: i,
              latitude: points[i].latitude,
              longitude: points[i].longitude,
              iconPath: '/res/icons/positioning.png',
              width: 32,
              height: 32
            }
          }

          _this.setData({
            markers: marker
          })
        }
      }
    });
  }
})