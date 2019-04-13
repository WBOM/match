// pages/bindingPhone/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: '',//定时器名字
    countDownNum: '60',//倒计时初始值
    show: false,
    phone:'',
  },
  //获取填写的手机号
  getPhone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  //发送验证码
  goSend: function (e) {
    var that = this;
    that.setData({
      show: true,
    });
    that.countDown();
    call.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Code/get_code',
      method: 'POST',
      data: {
        phone: that.data.phone
      },
      success: function (res) {
        console.log(res);
      },
    })
  },
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        if (countDownNum == 0) {
          clearInterval(that.data.timer); //关闭定时器
          that.setData({
            show: false,
            countDownNum: '60',
          })
        }
      }, 1000)
    })
  },
  //提交申请
  formSubmit(e) {
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    console.log('form发生了submit事件，携带数据为：', e.detail.value.checkbox[0])
    var that = this;
    if (e.detail.value.name == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.phone == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phone))) {
      warn = "手机号码格式不正确！";
    } else if (e.detail.value.yzm == "") {
      warn = "请输入验证码！";
    } else if (e.detail.value.checkbox[0] == undefined){
      warn = "请同意用户协议！";
    }else {
      flag = false;//若必要信息都填写，则不用弹框，且页面可以进行跳转
      wx.navigateTo({
        url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/be_referee',
        data: {
          book_id: that.data.matchId,
          username: e.detail.value.name,
          phone: e.detail.value.phone,
        },
        success: function (res) {
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