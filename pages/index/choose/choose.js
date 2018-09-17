const app = getApp()
const parkUrl = app.globalData.apiPre + '/mini/parkSpace/my';
Page({
  data: {
    none: false,
    lists: [],
    placeInfo:{}
  },
  onLoad:function(){
    if (app.globalData.sessionID == ''){
      wx.redirectTo({
        url: '../../mine/login/login',
      })
      return false;
    }
    var _this = this;
    wx.request({
      data: {},
      method: 'POST',
      header: {
        'sessionid': app.globalData.sessionID
      },
      url: parkUrl,
      success: function (res) {
        let listArr = res.data.result
        let list_len = listArr.length
        if (res.statusCode == 200 && Array.isArray(listArr) && list_len > 0) {
          for(var i = 0;i < list_len; i++){
            listArr[i].pic = listArr[i].pic.split('|');
          }
          _this.setData({
            none: false,
            lists: res.data.result
          })
        } else {
          _this.setData({
            none:true
          })
        }
      }
    });
  },
  radioChange: function (e) {
    if (e.currentTarget.dataset){
      this.setData({
        placeInfo: e.currentTarget.dataset
      })
    }
  },
  doneChoose: function(e){
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2]
    if (prePage) {
      prePage.selectCarPlace(this.data.placeInfo)
    }

    wx.navigateBack()
  },
  addPlace:function(e){
    wx.navigateTo({
      url: '../licence/licence',
    })
  }
})
