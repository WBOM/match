// pages/address/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:{},//地址列表
  },
  //跳转到添加地址
  goAddAddress: function () {
    wx.navigateTo({
      url: '../addAddress/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //获取地址列表
  getAddressList:function(){
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/UserAddress/lists',
      data: {
        user_id:1,//需要用户自己的user_id
      },
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          that.setData({
            addressList:res.data.lists
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            duration:1000
          })
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
    this.getAddressList();
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