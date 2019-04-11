// pages/microMatchPoint/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    userInfo:{},
    matchId:'',
    matchList:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId:options.userId,
      matchId:options.matchId
    })
    this.getUserInfo();
    this.getOtherMatch();
    console.log(this.data.userId)
  },
  //获取用户信息
  getUserInfo:function(){
    var that =this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/User/detail',
      data: {
        user_id:that.data.userId
      },
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          that.setData({
            userInfo:res.data.detail
          })
        }else{
          wx.showToast({
            title:res.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      },
    })
  },
  //获取用户发布的其他赛事
  getOtherMatch:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/lists',
      data: {
        user_id:that.data.userId
      },
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          that.setData({
            matchList:res.data.lists
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      },
    })
  },
  //跳转到赛事详情
  goMatchCetails:function(){
    var that =this;
    wx.navigateTo({
      url: '../matchDetails/index?matchId=' + that.data.matchId,
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