// pages/matchCetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //跳转到裁判页
  goRefereeApplication:function(){
    wx:wx.navigateTo({
      url: '../refereeApplication/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //报名
  signUp: function () {
    wx.navigateTo({
      url: '../fillInMatch/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //跳转到进行比赛页面
  goConductMatch:function(){
    wx:wx.navigateTo({
      url: '../conductMatch/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到微赛点主页
  goMicroMatchPoint:function(){
    wx:wx.navigateTo({
      url: '../microMatchPoint/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到比赛赞助页面
  goMatchSponsor:function(){
    wx:wx.navigateTo({
      url: '../matchSponsor/index?currentTab=2',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})