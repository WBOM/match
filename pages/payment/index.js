// pages/payment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:'',//订单id
    log_id: '',//订单记录id
    enroll_id: '',//报名记录id
    matchId:'',
    projectId:'',
    project:[],
    infoList:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      matchId: options.matchId,
      projectId: options.projectId,
      order_id: options.order_id,//订单id
      log_id: options.log_id,//订单记录id
      enroll_id: options.enroll_id,//报名记录id
    })
    this.getPrice();
  },
  //查询项目信息
  getPrice: function () {
    var that = this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookLists/lists',
      data: {
        book_id: that.data.matchId,
        group_id: that.data.projectId,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          project: res.data.lists[0]
        })
        console.log(that.data.project);
      }
    })
  },
  //确认信息列表
  goConfirm: function () {
    var that = this;
    wx.navigateTo({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/confirm',
      data: {
        order_id: that.data.order_id,
        log_id: that.data.log_id,
        enroll_id: that.data.enroll_id,
      },
      success: function (res) {
        thst.setData({
          infoList: res.data
        })
        console.log(that.data.infoList)
      },
    })
  },
  goPay:function(){
    wx.navigateTo({
      url: '../pay/index?order_id=' + this.data.order_id + '&log_id=' + this.data.log_id,
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