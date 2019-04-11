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
    tab:'-1'
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
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/lists',
      data: { 
        cate_id: e.target.dataset.type
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (typeof (res.data.lists) == "undefined") {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 1000
          }),
          that.setData(
            {
              matchLists:{},
              tab: e.target.dataset.type
            }
          )
        }else{
          that.setData(
            {
              matchLists: res.data.lists,
              tab: e.target.dataset.type
            }
          )
        }
      }
    })

  },
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
        that.setData(
          {
            matchLists: res.data.lists
          }
        )
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