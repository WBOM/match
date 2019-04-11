// pages/matchSponsor/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId:'',
    currentTab: 1,
    sponsorList:{},
  },
  // 点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  //跳转到报名页面
  goMatchDetails:function(){
    wx.navigateBack({
      url: '../matchDetails/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取赛事赞助
  getSponsorList:function(){
    var that = this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Sponsor/spon_lists',
      data: {
        book_id:that.data.matchId
      },
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          that.setData({
            sponsorList:res.data.lists
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTab:options.currentTab,
      matchId:options.matchId
    })
    this.getSponsorList();
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