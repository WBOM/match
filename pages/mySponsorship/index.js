// pages/mySponsorship/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    peopleList:[],
  },
  //获取我的赞助
  getMySponsorship:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/User/my_sponsor',
      data: {
        user_id:1,//需要登录之后获取
      },
      success: function(res) {
        console.log(res);
        that.setData({
          peopleList:res.data.lists
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //删除提醒
  confirmDelete:function(){
    wx:wx.showModal({
      title: '提示',
      content: '确定删除？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确认',
      confirmColor: '#E51C23',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMySponsorship();
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