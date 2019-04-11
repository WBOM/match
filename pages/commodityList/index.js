// pages/commodityList/index.js
import call from '../../utils/request.js'
var app = getApp();
var searchValue = ''
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    centent_Show: true,
    commodityList:{},
    commodityId:'',
  },
  goSearch: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
    if (!value && this.data.productData.length == 0) {
      this.setData({
        centent_Show: false,
      });
    }
  },
  suo: function (e) {
    var id = e.currentTarget.dataset.id
    var program_id = app.program_id;
    var that = this;
    wx.request({
      url: '',//这里填写后台给你的搜索接口
      method: 'post',
      data: { str: that.data.searchValue, program_id: program_id, style: id },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.setData({
            centent_Show: false,
          });
        }
        that.setData({
          nanshen_card: res.data,
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  },
  //跳转到赞助商
  goSponsor:function(){
    wx.navigateBack({
      url: '../sponsor/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //商品详情
  goMallDetails:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../mallDetails/index?commodityId=' + e.currentTarget.dataset.commodityid,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取所有商品
  getCommodityList:function(){
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/ShopGoods/lists',
      data: '',
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          that.setData({
            commodityList: res.data.lists
          })
        } else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //排序
  sort:function(e){
    console.log(e);
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/ShopGoods/lists',
      data: {
        order: e.currentTarget.dataset.sort
      },
      success: function(res) {
        console.log(res)
        if(res.data.status ==10001){
          that.setData({
            commodityList: res.data.lists
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
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
    this.getCommodityList();
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