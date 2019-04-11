// pages/addAddress/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['请选择地区', '', ''],
    customItem: '其他',
    postcode: undefined,//邮编
    type:0,//是否默认地址
  },
  //地区选择
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带地址为', e.detail.value)
    console.log('picker发送选择改变，携带邮政编码为', e.detail.postcode)
    this.setData({
      region: e.detail.value,
      postcode:e.detail.postcode
    })
  },
  //默认开关
  switchChange(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  //提交数据
  formSubmit(e) {
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this;
    if (e.detail.value.type) {
      that.setData({
        type: 1
      })
    }else{
      that.setData({
        type: 0
      })
    }
    if (e.detail.value.name == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.phone == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phone))) {
      warn = "手机号码格式不正确！";
    } else if (that.data.postcode == undefined) {//通过邮编判断是否选择地址
      warn = "请选择地址";
    } else if (e.detail.value.detailsSite==""){
      warn = "请输入详细地址";
    } else {
      flag = false;//若必要信息都填写，则不用弹框，且页面可以进行跳转
      wx.request({
        url: 'http://test.tuolve.com/jingsai/web/api.php/UserAddress/add',
        data: {
          name: e.detail.value.name,
          phone: e.detail.value.phone,
          details_site:e.detail.value.address+e.detail.value.detailsSite,
          type:that.data.type
        },
        success: function (res) {
          if(res.data.status==10001){
            wx.showToast({
              title: '成功',
              icon: 'seccess',
              duration: 1000,
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000,
            })
          }
          console.log(res);//这里需要判断验证码的正确
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
  formReset() {
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