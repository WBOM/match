// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userInfo: {},
  },
  //跳转到我的二维码
  goMyQRCode:function(){
    wx.navigateTo({
      url: '../myQRCode/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到我的相关比赛-待参赛
  goMyMatch1:function(){
    wx.navigateTo({
      url: '../myMatch/index?currentTab=0',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  goMyMatch2: function () {
    wx.navigateTo({
      url: '../myMatch/index?currentTab=1',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goMyMatch3: function () {
    wx.navigateTo({
      url: '../myMatch/index?currentTab=2',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goMyMatch4: function () {
    wx.navigateTo({
      url: '../myMatch/index?currentTab=3',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //跳转到我的赞助
  goMySponsorship:function(){
    wx.navigateTo({
      url: '../mySponsorship/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到发布赛事
  goInitiatedEvent:function(){
    wx.navigateTo({
      url: '../initiatedEvent/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到转移界面
  goTransfer:function(){
    wx.navigateTo({
      url: '../transfer/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到绑定手机页面
  goBindingPhone:function(){
    wx.navigateTo({
      url: '../bindingPhone/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到提现页面
  goWithdraw:function(){
    wx.navigateTo({
      url: '../withdraw/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到我的关注
  goMyFocus:function(){
    wx.navigateTo({
      url: '../myFocus/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到微订单
  goOrder:function(){
    wx.navigateTo({
      url: '../order/index',
      success: function(res) {
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到比赛分类
  goManageClass:function(){
    wx.navigateTo({
      url: '../manageClass/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到我的微赛圈
  goMyMicroRace:function(){
    wx.navigateTo({
      url: '../myMicroRace/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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