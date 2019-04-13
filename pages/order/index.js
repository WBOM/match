// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressId:'',
  },
  //跳转到地址页面
  goAddress:function(){
    wx.navigateTo({
      url: '../address/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到支付页面
  goPay:function(){
    wx.navigateTo({
      url: '../pay/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //查询默认地址
  getDefaultAddress:function(){
    var that=this;
    var type=that.type;
    if (that.data.addressId==''){
      type=1
    }else{
      type=''
    }
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/UserAddress/lists',
      data: {
        type:type,//默认地址
        user_id:'1',//用户自己的ID
        id:that.data.addressId
      },
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getDefaultAddress();
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