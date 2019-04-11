// pages/matchDetails/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId:'',
    projectId: '',
    matchInformation:[],
    peopleLists:[],
    result:false,
    userId:'',//发布者ID
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      matchId: options.matchId
    });
    console.log(this.data.matchId);
    this.getMatchInformation();
    this.getPeopleLists();
  },
  //跳转到裁判页
  goRefereeApplication:function(){
    wx:wx.navigateTo({
      url: '../refereeApplication/index?matchId='+ this.data.matchId,
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
      url: '../conductMatch/index?matchId=' + this.data.matchId + '&projectId=' + this.data.projectId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到微赛点主页
  goMicroMatchPoint:function(){
    var that=this;
    wx.navigateTo({
      url: '../microMatchPoint/index?userId=' + that.data.userId + '&matchId=' + that.data.matchId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到比赛赞助页面
  goMatchSponsor:function(){
    wx.navigateTo({
      url: '../matchSponsor/index?currentTab=2&matchId='+ this.data.matchId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取赛事详细信息
  getMatchInformation:function(){
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/detail',
      data: { id: that.data.matchId },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData(
          {
            matchInformation: res.data.detail,
            userId: res.data.detail.user_id
          })
          console.log('赛事发布者ID='+that.data.userId);
      },
    })
  },
  //获取赛事报名人员列表
  getPeopleLists:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/bao_lists',
      data: { book_id: that.data.matchId },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
            peopleLists: res.data.lists
          })
      },
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