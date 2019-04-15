// pages/matchDetails/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId:'',
    projectId: '',
    projectList:[],//项目列表
    matchInformation:[],
    peopleLists:[],
    result:false,
    userId:'',//发布者ID
    locking: false,
    tag:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      matchId: options.matchId
    });
    console.log(this.data.matchId);
    this.getMatchInformation();
    this.getPeopleLists();
    this.getProjectId();
  },
  //跳转到裁判页
  goRefereeApplication:function(){
    wx:wx.navigateTo({
      url: '../refereeApplication/index?matchId='+ this.data.matchId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //报名
  signUp: function () {
    wx.navigateTo({
      url: '../fillInMatch/index?matchId='+this.data.matchId +'&projectId='+this.data.projectId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //跳转到进行比赛页面
  goConductMatch:function(){
    var that =this;
    wx: wx.navigateTo({
      url: '../conductMatch/index?matchId=' + that.data.matchId + '&projectId=' + that.data.projectId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //打开项目列表
  goProjectList:function(e){
    var that = this;
    that.setData({
      tag:e.currentTarget.dataset.tag
    });
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      selectEvent: true,
      locking: true,
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  //点击遮盖层隐藏选择
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        selectEvent: false,
        locking: false,
      })
    }, 200)
  },
  //选择项目
  selectProject:function(e){
    this.setData({
      projectId: e.currentTarget.dataset.projectid
    })
  },
  //跳转到微赛点主页
  goMicroMatchPoint:function(){
    var that=this;
    wx.navigateTo({
      url: '../microMatchPoint/index?userId=' + that.data.userId + '&matchId=' + that.data.matchId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到比赛赞助页面
  goMatchSponsor:function(){
    var that=this;
    wx.navigateTo({
      url: '../matchSponsor/index?currentTab=1&matchId=' + that.data.matchId + '&matchTitle=' + that.data.matchInformation.title,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取赛事详细信息
  getMatchInformation:function(){
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/detail',
      data: { id: that.data.matchId },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData(
          {
            matchInformation: res.data.detail,
            userId: res.data.detail.user_id
          })
          console.log('赛事发布者ID='+that.data.userId);
      },
    })
  },
  //获取赛事报名人员列表
  getPeopleLists:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/bao_lists',
      data: { book_id: that.data.matchId },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          peopleLists: res.data.lists
        })
        console.log(that.data.peopleLists);
      },
    })
  },
  //获取项目列表
  getProjectId:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookLists/lists',
      data: {
        book_id:that.data.matchId
      },
      success: function(res) {
        console.log(res);
        if(res.data.status){
          that.setData({
            projectList: res.data.lists,
            projectId:res.data.lists[0].id,//默认第一个项目
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
  //点击确认
  goConfirm:function(){
    var that=this;
    var tag=that.data.tag;
    if(tag==1){
      that.goConductMatch();
    }else{
      that.signUp();
    }
    that.hideModal();
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