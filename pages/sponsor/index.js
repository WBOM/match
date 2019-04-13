// pages/sponsor/index.js
import call from '../../utils/request.js'
var app = getApp();
var searchValue = ''
Page({
  /**
   * 页面的初始数据
   */

  data: {
    centent_Show: true,
    sponsorList:{},
  },
  //搜索
  goSearch:function(e){
    console.log(e);
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Sponsor/spon_lists',
      data: {
        keyworld: e.detail.value
      },
      success: function(res) {
        console.log(res)
        if(res.data.status==10001){
          that.setData({
            sponsorList:res.data.lists,
            centent_Show: false
          })        
        } else if (res.data.status == 10002){
          that.setData({
            centent_Show: false
          })
        } else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      }
    })
  },
  //跳转到商品界面
  goCommodity:function(){
    wx.navigateTo({
      url: '../commodityList/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到赞助商商城
  goMall:function(){
    wx.navigateTo({
      url: '../mall/index?',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取赞助商列表
  getSponsor:function(){
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Sponsor/spon_lists',
      data: '',
      success: function(res) {
        console.log(res)
        if(res.data.status==10001){
          that.setData({
            sponsorList:res.data.lists
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            image: '',
            duration: 1000,
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
    this.getSponsor();
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