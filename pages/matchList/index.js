// pages/matchList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectEvent: false,
    locking:false,
    box:false,
    animationData: {},
    selectLists: [
      { name: 'USA', value: '美国', price:188 },
      { name: 'CHN', value: '中国', price:998 },
      { name: 'BRA', value: '巴西', price:666 },
      { name: 'JPN', value: '日本', price:121 },
      { name: 'ENG', value: '英国', price:133 },
      { name: 'TUR', value: '法国', price:222 },
      { name: 'TUR', value: '法国', price:222 },
      { name: 'TUR', value: '法国', price: 22 },
    ],
    totalPrice: 0, 
  },
  goMatchDetails:function(){
    wx:wx.navigateTo({
      url: '../matchDetails/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取总价
  getTotalPrice() {
    let selectLists = this.data.selectLists;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < selectLists.length; i++) {         // 循环列表得到每个数据
      if (selectLists[i].selected) {                   // 判断选中才会计算价格
        total += selectLists[i].price;     // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      selectLists: selectLists,
      totalPrice: total.toFixed(0)
    });
  },
  //选择事件
  selectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let selectLists = this.data.selectLists;                    // 获取购物车列表
    const selected = selectLists[index].selected;         // 获取当前商品的选中状态
    selectLists[index].selected = !selected;              // 改变状态
    this.setData({
      selectLists: selectLists
    });
    this.getTotalPrice();                           // 重新获取总价
  },
  //点击一键报名，显示赛事选择
  selectEvent:function(){
    // 用that取代this，防止不必要的情况发生
    var that = this;
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
        box: false
      })
    }, 200)
  },
  //分类显示下拉框
  classShow:function(){
    this.setData({
      box:true,
      locking:true,
    })
  },
  //报名
  signUp:function(){
    wx:wx.navigateTo({
      url: '../fillInMatch/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  move: function () { },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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