// pages/matchList/index.js
import call from '../../utils/request.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectEvent: false,
    locking:false,
    box:false,
    animationData: {},
    selectLists:'',
    totalPrice: 0, //总价
    currentTab: 0,
    matchLists:{},
    raceType:[],
    matchId:[],
    projectId:'',
  },
  //赛事详情
  goMatchDetails:function(e){
    wx.navigateTo({
      url: "../matchDetails/index?matchId=" + e.target.dataset.matchid,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到发布赛事
  goInitiatedEvent: function () {
    wx.navigateTo({
      url: '../initiatedEvent/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
  /*
  //获取总价
   getTotalPrice() {
    let selectLists = this.data.selectLists;                  // 获取购物车列表
    let total = 0;
    this.data.projectId=[];
    for (let i = 0; i < selectLists.length; i++) {         // 循环列表得到每个数据
      if (selectLists[i].selected) {                   // 判断选中才会计算价格
        total += parseFloat(selectLists[i].team_price);  // 所有价格加起来
        this.data.projectId.push(selectLists[i].id);
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      selectLists: selectLists,
      totalPrice: total.toFixed(0)
    });
    console.log(this.data.projectId);
  },
  //选择事件
  goSelectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let selectLists = this.data.selectLists;                    // 获取购物车列表
    const selected = selectLists[index].selected;         // 获取当前商品的选中状态
    selectLists[index].selected = !selected;         // 改变状态
    this.setData({
      selectLists: selectLists,
    });
    console
    this.getTotalPrice();                           // 重新获取总价
  },
  */
  //点击一键报名，显示赛事选择
  selectEvent:function(e){
    var that = this;
    console.log(e.target.dataset.matchid);
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookLists/lists',
      data: {
        book_id: e.target.dataset.matchid
        },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData(
          {
            matchId: e.target.dataset.matchid,
            selectLists: res.data.lists,
            totalPrice:res.data.lists[0].team_price,
            projectId:res.data.lists[0].id,
          })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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
      locking:true,
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
  hideModal: function (e) {
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
        locking:false,
        box: false,
        currentTab:0,
        matchId:-1
      })
    }, 200)
  },
  //选择事件
  goSelectList: function (e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let selectLists = this.data.selectLists;                    // 获取购物车列表     
    this.setData({
      projectId: selectLists[index].id,
      totalPrice: selectLists[index].team_price
    });
    console.log(this.data.projectId);
  },
  //分类显示下拉框
  classShow:function(e){
    var that = this;
    console.log(e.target.dataset);
    if (this.data.currentTab === e.target.dataset.current) {
      that.setData({
        currentTab:0,
        box:false
      })
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        box:true
      })
    } 
  },
  //报名
  signUp:function(){
    if (this.data.matchId!=''){
      wx.navigateTo({
        url: '../fillInMatch/index?projectId=' + this.data.projectId + '&matchId=' + this.data.matchId,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      wx.showModal({
        showCancel:false,
        confirmColor:'#E51C23',
        content: '请选择报名项目',
        success(res) {
          console.log('用户点击确定')
        }
      })
    }
    
  },
  move: function () { },
  //获取推荐列表
  getRecommendLists:function(){
    var that=this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/lists',
      data: {is_tuijian:1},
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData(
          {
            matchLists: res.data.lists
          })  
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取赛事种类
  getMatchClass: function () {
    var that = this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookCategory/lists',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('赛事种类' + res.data)
        that.setData(
          {
            raceType: res.data.data
          }
        )
      }
    })
  },
  //通过赛事种类获取赛事列表
  getMatchTypeLists: function (e) {
    var that = this;
    that.setData({
      currentTab: 0,
      box: false,
    }),
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
              matchLists: {},
            }
          )
        } else {
          that.setData(
            {
              matchLists: res.data.lists,
            }
          )
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //获取赛事项目列表
  getProjectLists: function (e) {
    var that = this;
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendLists();
    this.getMatchClass();
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