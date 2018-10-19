const app = getApp()
const listUrl = app.globalData.apiPre + '/mini/share/find/byLngLat';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:'',
    markers:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          latitude: latitude,
          longitude: longitude
        })

        wx.request({
          data: {
            lng: latitude,
            lat: longitude,
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
              for (var i = 0; i < points.length;i++){
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
  }
})