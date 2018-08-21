const app = getApp()
const parkUrl = app.globalData.apiPre + '/mini/parkSpace/my';
Page({
  data: {
    lists: []
  },
  onLoad:function(){
    if (app.globalData.sessionID == ''){
      wx.redirectTo({
        url: '../../mine/login/login',
      })
      return false;
    }

    wx.request({
      data: {},
      method: 'POST',
      header: {
        'sessionid': app.globalData.sessionID
      },
      url: parkUrl,
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200 && typeof (res.data.phone) != 'undefined') {
          
        } else {
          //tips('登录失败')
        }
      }
    });
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    // var items = this.data.items;
    // for (var i = 0, len = items.length; i < len; ++i) {
    //   items[i].checked = items[i].value == e.detail.value
    // }

    // this.setData({
    //   items: items
    // });
  },
  doneChoose: function(e){
    wx.navigateBack()
  },
  addPlace:function(e){
    wx.navigateTo({
      url: '../licence/licence',
    })
  }
})
