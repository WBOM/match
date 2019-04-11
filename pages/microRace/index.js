// pages/microRace/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    microRaceList:[],
    animationData: {},
    raceId:'',//微赛圈Id
  },
  goRelease:function(){
    wx:wx.navigateTo({
      url: '../releaseMicroRace/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到详情
  goMyMicroRace:function(){
    wx:wx.navigateTo({
      url: '../myMicroRace/index&raceId='+ this.data.raceId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取微赛圈列表
  getMicroRace:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Cms/lists',
      data: {
        user_id:1,//需要登录获取userId
      },//需要登录
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          that.setData({
            microRaceList: res.data.lists
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      }
    })
  },
  //搜索框展开
  goExpand:function(){
    const animation=wx.createAnimation({
      duration: 1000,
      timingFunction: '"linear"',
    })
    this.animation=animation.width('100%').step()
    this.setData({
      animationData:animation.export()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMicroRace();
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