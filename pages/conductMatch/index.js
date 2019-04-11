// pages/conductMatch/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId:'',
    projectId:'',
    basicList:{},//基本信息
    array: ['A组', 'B组', 'C组', 'D组'],
    index:0,
    currentTab:0,
    date: '2019-01-01',
    time: '12:00'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBasicInformation();
    this.getGrouping();
    this.setData({
      matchId:options.matchId,
      projectId:options.projectId
    })
    console.log(this.data.matchId +'-'+this.data.projectId);
  },
  //获取赛事基本信息
  getBasicInformation:function(){
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Borrow/compete',
      data: {
        book_id:that.data.matchId,
        group_id:that.data.projectId
      },
      success: function(res) {
        console.log(res);
        if (res.data.status == 10001){

            that.setData({
              basicList: res.data.lists
            })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取分组
  getGrouping:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Borrow/get_group',
      data: {
        book_id: that.data.matchId,
        group_id: that.data.projectId
      },
      success: function(res) {
        console.log(res);
        if (res.data.status == 10001) {
            that.setData({
              array: res.data.lists
            })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindPickerChange: function (e) {
    var that = this;
    if (this.data.currentTab === e.detail.value) {
      return false;
    } else {
      that.setData({
        index: e.detail.value,
        currentTab: e.detail.value,
      })
    }
    console.log('picker发送选择改变，携带值为', e.detail.value)
  
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset() {
    console.log('form发生了reset事件')
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