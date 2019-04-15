// pages/matchClass/index.js
const app = getApp();
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    raceType: [],
    matchLists:{},
    cateId:'',
    tab:'-1',
    noData:false,
  },
  //跳转到赛事详情
  goMatchDetails: function (e) {
    wx.navigateTo({
      url: "../matchDetails/index?matchId=" + e.currentTarget.dataset.matchid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //获取赛事种类
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookCategory/lists',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('赛事种类2' + res.data)
        that.setData(
          {
            raceType: res.data.data
          }
        )
      }
    })

  },
  //按种类查询赛事列表
  getTypeMatch:function(e){
    var that = this;
    that.setData({
      cateId:e.target.dataset.type
    })
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/lists',
      data: { 
        cate_id: that.data.cateId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (typeof (res.data.lists) == "undefined") {
          that.setData({
            matchLists:{},
            noData:true,
            tab: e.target.dataset.type
          })
        }else{
          that.setData({
            noData: false,
            matchLists: res.data.lists,
            tab: e.target.dataset.type
          })
        }
      }
    })

  },
  //获取推荐分类
  goValue:function(){
    var that=this;
    that.setData({
      tab:-1
    });

    //推荐
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/lists',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('推荐' + res.data)
        that.setData({
          noData:false,
          matchLists: res.data.lists
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.goValue();
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