// pages/numberApplicants/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId:'',
    matchInfo:'',
    registrationList:'',
  },
  //获取赛事详情
  getMatchInfo:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/detail',
      data: {
        id:that.data.matchId
      },
      success: function(res) {
        if(res.data.status==10001){
          that.setData({
            matchInfo:res.data.detail
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
  //获取已报名人员列表
  getRegistrationList:function(){
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/bao_lists',
      data: {
        book_id:that.data.matchId
      },
      success: function(res) {
        console.log(res);
        if (res.data.status == 10001) {
          that.setData({
            registrationList: res.data.lists
          })
        } else {
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
      matchId:options.matchId
    })
    this.getMatchInfo();
    this.getRegistrationList();
    console.log(this.data.matchId);
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