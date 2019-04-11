// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentMethod: [
      { name: 'weixin', value: '微信支付', checked: 'true' },
      { name: 'bankCard', value: '银行卡支付', },
    ],
    order_id: '',//订单id
    log_id: '',//订单记录id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.order_id,
      log_id: options.order_id,
    })
    console.log(this.data.order_id+'-'+this.data.log_id);
  },
  //付款
  pay:function(){
    var that =this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/pay',
      data:{
        order_id:that.data.order_id,
        log_id:that.data.log_id,
        order_type:2,
      },
      success: function (res) {
        console.log(res);
      }
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