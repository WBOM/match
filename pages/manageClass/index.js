// pages/manageClass/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList:[],
  },
  //获取我的分类
  getClassList:function(){
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/User/my_cate',
      data: {
        user_id:1,//需要登录取得
      },
      success: function(res) {
        console.log(res);
        if (res.data.lists != undefined){
          that.setData({
            classList:res.data.lists
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
            success: function(res) {
              console.log(0)
            },
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //确认添加
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/User/add_cate',
      data: {
        cate_name: e.detail.value.name
      },
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          wx.showToast({
            title: '添加成功',
            icon: 'success',
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassList();
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