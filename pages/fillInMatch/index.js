// pages/fillInMatch/index.js
import call from '../../utils/request.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    projectId:'',//项目id
    price:'',//价格
    matchId:'',//赛事ID
    competitionList: ['4*100接力赛', '1000米竞赛', '10公里马拉松', '铁人三项'],
    index: 0,
    lvList: ['A级', 'B级', 'C级', 'D级'],
    lv: 0,
    matchInformation:[],
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
  //查询价格
  getPrice:function(){
    var that = this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookLists/lists',
      data:{
        book_id:that.data.matchId,
        group_id:that.data.projectId,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          price: res.data.lists[0].team_price
        })
      }
    })
  },
  formSubmit: function (e) {
    let { name, phone, competition, lv, emergency, teamname } = e.detail.value;
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    var that=this;
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
      flag = false,//若必要信息都填写，则不用弹框，且页面可以进行跳转
      wx.request({
        url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/enroll',
        data: {
          book_id:that.data.matchId,
          group_id:that.data.projectId,
          name: e.detail.value.name,
          phone:e.detail.value.phone,
          emergency_contact_mobile: e.detail.value.emergency,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.status = 20002){//10001
            console.log(res);
            wx.navigateTo({
              url: '../confirm/index?name=' + e.detail.value.name + '&phone=' + e.detail.value.phone + '&competition=' + e.detail.value.competition + '&lv=' + e.detail.value.lv + '&emergency=' + e.detail.value.emergency + '&teamname=' + e.detail.value.teamname + '&matchId=' + that.data.matchId + '&projectId=' + that.data.projectId + '&enroll_id=' + res.data.enroll_id + '&order_id=' + res.data.order_id + '&log_id=' + res.data.log_id
            })
          }else{
            wx.showToast({
              title: '操作失败',
              icon: 'none',
              duration: 1000
            })
          }
        },
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
  //获取赛事详细信息
  getMatchInformation: function () {
    var that = this;
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/detail',
      data: { id: that.data.matchId },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData(
          {
            matchInformation: res.data.detail
          })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      projectId: options.projectId,
      matchId:options.matchId,
    });
    this.getMatchInformation();
    this.getPrice();
    console.log(this.data.projectId + '-' + this.data.matchId);
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