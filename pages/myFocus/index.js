// pages/myFocus/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attentionList:[],
  },
  //获取关注列表
  getAttentionList:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/User/collection_lists',
      data: {
        user_id:1,//需要获取用户自己的id
      },
      success: function(res) {
        console.log(res);
        if(res.data.status=10001){
          that.setData({
            attentionList: res.data.lists
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      }
    })
  },
  //取消关注
  goCancel:function(e){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确认取消关注吗？',
      showCancel: true,
      confirmColor: '#E51C23',
      success: function(res) {
        if(res.confirm){
          wx.request({
            url: 'http://test.tuolve.com/jingsai/web/api.php/User/Collection',
            data: {
              id: e.currenTaget.dataset.matchid
            },
            success: function (res) {
              if(res.data.status==10002){
                wx.showToast({
                  title: '已取消关注',
                  icon: 'success',
                  duration: 1000,
                })
                that.onReady();
              }
            },
          })
        }else if(res.cancel){
          console.log('用户点击取消')
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
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAttentionList();
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