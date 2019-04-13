// pages/myMatch/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 3,
    myReleaseList:[],//我的发布列表
    waitingList:[],//待参赛列表
    myRegistrationList:[],//我的报名
    locking: false,
    matchId:'',
    projectList:[],//项目列表
    projectId:'',//项目id
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  //进入主办人页面
  goOrganiser:function(e){
    this.hideModal();
    wx.navigateTo({
      url: '../organiser/index?matchId='+ this.data.matchId+'&projectId='+this.data.projectId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到转移界面
  goTransfer:function(){
    wx.navigateTo({
      url: '../transfer/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到已报人员界面
  goNumberApplicants:function(e){
    wx.navigateTo({
      url: '../numberApplicants/index?matchId=' + e.currentTarget.dataset.matchid,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取我的发布
  getMyRelease:function(){
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/lists',
      data: {
        user_id:1,//需要用户自己的ID
      },
      success: function(res) {
        console.log('我的发布',res);
        if (res.data.status==10001){
          that.setData({
            myReleaseList:res.data.lists
          })
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
  //获取待参赛列表
  getWaitingList:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/UserOrder/lists',
      data: {
        user_id:1,//需要用户自己的ID
        status:1,//待参赛
      },
      success: function (res) {
        console.log('待参赛', res);
        if (res.data.status == 10001) {
          that.setData({
            waitingList: res.data.lists
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
  //获取我的报名
  getMyRegistrationList:function(){
    var that = this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/UserOrder/lists',
      data: {
        user_id: 1,//需要用户自己的ID
      },
      success: function (res) {
        console.log('我的报名', res);
        if (res.data.status == 10001) {
          that.setData({
            myRegistrationList: res.data.lists
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
  //打开项目列表
  goProjectList: function (e) {
    var that = this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookLists/lists',
      data: {
        book_id:e.currentTarget.dataset.matchid
      },
      success: function (res) {
        console.log(res);
        if (res.data.status) {
          that.setData({
            matchId: e.currentTarget.dataset.matchid,
            projectList: res.data.lists,
            projectId: res.data.lists[0].id,//默认第一个项目
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      }
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
  selectProject: function (e) {
    this.setData({
      projectId: e.currentTarget.dataset.projectid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTab: options.currentTab
    })
    this.getMyRelease();
    this.getWaitingList();
    this.getMyRegistrationList();
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