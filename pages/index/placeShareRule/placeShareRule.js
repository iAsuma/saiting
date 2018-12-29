// pages/index/publish/publish.js
const app = getApp()
const shareSureUrl = app.globalData.apiPre + '/mini/share/sure';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hidden:true, //不可改为false
    collect:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      collect: JSON.parse(options.fistform)
    })
  },
  releaseSubmit:function(e){
    var formdata = e.detail.value
    if (formdata.clFreeSec == '' || formdata.clSec == '' || formdata.clCost == ''){
      tips('请完整填写取消规则')
      return;
    }

    if (formdata.orFreeSec == '' || formdata.orSec == '' || formdata.orCost == '') {
      tips('请完整填写超时规则')
      return;
    }

    let postdata = {
      psId: formdata.psid,
      plId: formdata.plid,
      startDate: formdata.sdate + ' ' + formdata.stime,
      endDate: formdata.sdate + ' ' + formdata.etime,
      cancel: formdata.clFreeSec,
      cancelSec: formdata.clSec,
      cancelCost: formdata.clCost,
      overTime: formdata.orFreeSec,
      overTimeSec: formdata.orSec,
      overTimeCost: formdata.orCost,
      cost: formdata.uprice,
      remark:formdata.attention
    }

    wx.request({
      data: postdata,
      method: 'POST',
      header: {
        'sessionid': app.globalData.sessionID
      },
      url: shareSureUrl,
      success: function (res) {
        if (res.statusCode == 200 && res.data.code == 100 ) {
          tips('发布成功',function(){
            wx.redirectTo({
              url: '../sharePlaceDetail/sharePlaceDetail?from_page=1&shareId=' + res.data.result,
            })
          })
        } else {
          tips(res.data.result)
        }
      }
    });
  }

})

function tips(msg, callback) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
    success:function(){
      if(callback && typeof(callback) == 'function'){
        callback()
      }
    }
  })
}