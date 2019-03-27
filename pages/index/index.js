//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    raceType: ["篮球", "羽毛球", "乒乓球", "排球", "网球", "足球", "溜溜球","棒球","小皮球","精灵球"]
  },
  //跳转到赛事列表页面
  goMatchClass:function(){
    wx.navigateTo({
      url: '../matchClass/index'
    })
  },
  
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function () {
    //获取页面分类列表
    wx.request({
      url: '', // 仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
