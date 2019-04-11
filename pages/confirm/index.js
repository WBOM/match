// pages/confirm/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    competition:'',
    lv:'',
    emergency:'',
    teamname:'',
    matchId:'',
    projectId:'',
    order_id: '',//订单id
    log_id: '',//订单记录id
    enroll_id: '',//报名记录id
    infoList:[],
    project: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      phone:options.phone,
      competition:options.competition,
      lv:options.lv, 
      emergency:options.emergency,
      teamname:options.teamname,
      matchId:options.matchId,
      projectId: options.projectId,
      order_id: options.order_id,
      log_id: options.log_id,
      enroll_id: options.enroll_id
    })
    this.getPrice();
  },
  //确认信息列表
  goConfirm:function(){
    var that=this;
    wx.navigateTo({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/confirm',
      data:{
        order_id: that.data.order_id,
        log_id: that.data.log_id,
        enroll_id: that.data.enroll_id,
      },
      success:function(res){
        thst.setData({
          infoList: res.data
        })  
      },
    })
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
      }
    })
  },
  //跳转到支付页面
  goPayment:function(){
    wx.navigateTo({
      url: '../payment/index?matchId=' + this.data.matchId + '&projectId=' + this.data.projectId + '&log_id=' + this.data.log_id + '&order_id=' + this.data.order_id + '&enroll_id=' + this.data.enroll_id,
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