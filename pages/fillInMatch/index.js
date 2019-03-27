// pages/fillInMatch/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    competitionList: ['4*100接力赛', '1000米竞赛', '10公里马拉松', '铁人三项'],
    index: 0,
    lvList: ['A级', 'B级', 'C级', 'D级'],
    lv: 0,
  },
  bindCompetitionChange(e) {
    console.log('picker发送选择改变，index携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindLvChange(e) {
    console.log('picker发送选择改变，lv携带值为', e.detail.value)
    this.setData({
      lv: e.detail.value
    })
  },
  formSubmit: function (e) {
    let { name, phone, competition, lv, emergency, teamname } = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    console.log('form发生了submit事件，携带数据为：', e.detail.value.lv);
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    //判断的顺序依次是：姓名-手机号-地址-具体地址-预约日期-预约时间-开荒面积
    if (e.detail.value.name == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.phone == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phone))) {
      warn = "手机号码格式不正确！";
    } else if (e.detail.value.emergency == "") {
      warn = "请填写您的紧急联系人手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.emergency))) {
      warn = "紧急联系人号码格式不正确！"
    } else if (e.detail.value.teamname == "") {
      warn = "请输入您的队名！";
    } else {
      flag = false;//若必要信息都填写，则不用弹框，且页面可以进行跳转
      var that = this;
      //？后面跟的是需要传递到下一个页面的参数
      wx.navigateTo({
        url: '../confirm/index?name=' + e.detail.value.name + '&phone=' + e.detail.value.phone + '&competition=' + e.detail.value.competition + '&lv=' + e.detail.value.lv + '&emergency=' + e.detail.value.emergency + '&teamname=' + e.detail.value.teamname
      })
    }
    //如果信息填写不完整，弹出输入框
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn,
        confirmColor: '#E51C23',
        showCancel: false
      })
    }
  },
  formReset: function () {
    console.log('form发生了reset事件')
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