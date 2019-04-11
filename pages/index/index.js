//index.js
//获取应用实例
var  app=getApp()
Page({
  data: {
    raceType: [],
    notice:true,
    imgUrls: {},
    pictureList:[],
    recommendList:[],
  },
  clearTop:function(){
    this.setData({
      notice:false,
    })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onLoad: function () {
    this.getPropList();
    this.getMatchClass();
    this.getRecommend();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //获取主页轮播图
  getPropList:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Ad/lists',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('轮播' + res.data.lists)
        that.setData(
          {
            imgUrls: res.data.lists
          }
        )
      }
    })
  },
  //获取赛事种类
  getMatchClass: function () {
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookCategory/lists',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('赛事种类' + res.data)
        that.setData(
          {
            raceType: res.data.data
          }
        )
      }
    })
  },
   //主页推荐
  getRecommend:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/lists',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('推荐' + res.data)
        that.setData(
          {
            recommendList: res.data.lists
          }
        )
      }
    })
  }  
})
