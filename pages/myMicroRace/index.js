// pages/myMicroRace/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    raceId:'',
    raceList:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id: options.user_id
    })
    this.getMicroRaceList();
  },
  //获取我的微赛圈
  getMicroRaceList:function(){
    var that =this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Cms/lists',
      data: {
        user_id:that.data.user_id,
      },
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          var list=res.data.lists;
          for (var i = 0; i < list.length; i++) {
            list[i]["showtime"] = util.formatDate(list[i]["showtime"])
          }
          that.setData({
            raceList: list
          })
          console.log(that.data.raceList)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      },
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