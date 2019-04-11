//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          // --------- 发送凭证 ------------------
          wx.request({
            url: 'http://test.tuolve.com/jingsai/web/api.php/Login/wxlogin',
            method: 'POST',
            data: { code: code },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              //console.log(res);
              // 存token
              //console.log('token=' + res.data.data.token)
              //that.globalData.token = res.data.data.token;//拿到后将token存入全局变量  以便其他页面使用
            }
          })
          // ------------------------------------
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  
})