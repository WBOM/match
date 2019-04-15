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
    array: [
      {group_name: 'A组'}, 
      {group_name: 'B组'}, 
      {group_name: 'C组'}, 
      {group_name: 'D组'}
    ],
    index:0,
    currentTab:0,
    date: '2019-01-01',
    time: '12:00',
    phoneShow: false,
    invitationtype:'',//邀请组队类型
    group:'',//组名
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
              array: res.data.lists,
              group: res.data.lists[0].group_name
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
    
    that.onReady();
    if (this.data.currentTab === e.detail.value) {
      return false;
    } else {
      that.setData({
        index: e.detail.value,
        group: that.data.array[e.detail.value].group_name,
        currentTab: e.detail.value,
      })
    }
    console.log(that.data.group);
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
  //签到
  goCheckIn:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Borrow/set_online',
      data: {
        book_id:that.data.matchId,
        group_id:that.data.projectId,
      },
      success: function(res) {
        if(res.data.status==10001){
          wx.showToast({
            title: '签到成功！',
            icon: 'success',
            duration: 1000,
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
  //退赛

  //点击邀请加入
  goInvite: function (e) {
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    console.log(e);
  },
  /**
  * 用户点击分享
  */
  onShareAppMessage: function (ops) {
    var that = this;
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '我邀请了你参加一场比赛，快快加入吧！',
      path: 'pages/matchDetails/index?matchId=' + that.data.matchId,
      imageUrl: 'pages/image/index.png',
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {//判断分享是否成功
          if (res.shareTickets == undefined) {//判断分享结果是否有群信息
            //分享到好友操作...
          } else {
            //分享到群操作...
            var shareTicket = res.shareTickets[0];
            wx.getShareInfo({
              shareTicket: shareTicket,
              success: function (e) {
                //当前群相关信息
                var encryptedData = e.encryptedData;
                var iv = e.iv;
              }
            })
          }
        }
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBasicInformation();
    this.getGrouping();
    this.setData({
      matchId: options.matchId,
      projectId: options.projectId
    })
    console.log(this.data.matchId + '-' + this.data.projectId);
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