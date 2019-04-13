// pages/organiser/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId:'',
    projectId:'',//项目ID
    groupList: ['A组', 'B组', 'C组', 'D组'],
    siteList: ['陆地', '海洋', '天空'],
    refereeList: ['1号', '2号', '3号'],//裁判列表
    groupIndex: 0,
    siteIndex: 0,
    refereeIndex: 0,
    currentTab: 0,
    date: '2019-01-01',
    time: '12:00',
    ranking: true,
    playerPhoto: "../image/increase.png",
    tempFilePaths: '',
    albumPhotos: ['../image/increase.png'],
    video: '',
    registeredList:[],//已报名列表
    allRefereeList:[],//所有申请裁判列表
    refereeList:[],//已通过裁判列表
    phoneShow:false,
    signInNumber:0,//签到人数
    groupingType: [
      { index: 2, value: '不混抽分组', checked: 'true' },
      { index:1,value:'混抽分组'},
      { index:3,value:'团体随机分组'}],
  },
  // 点击切换
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
  //小组列表
  bindGroupListChange: function (e) {
    this.setData({
      groupIndex: e.detail.value,
    })
    console.log('picker1发送选择改变，携带值为', e.detail.value)
  },
  //场地
  bindSiteListChange: function (e) {
    this.setData({
      siteIndex: e.detail.value,
    })
    console.log('picker2发送选择改变，携带值为', e.detail.value)
  },
  //裁判
  bindRefereeListChange: function (e) {
    this.setData({
      refereeIndex: e.detail.value,
    })
    console.log('picker3发送选择改变，携带值为', e.detail.value)
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset() {
    console.log('form发生了reset事件')
  },
  /***************************/
  //已报名列表
  getRegisteredList:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/bao_lists',
      data: {
        book_id:that.data.matchId,
        group_id:that.data.projectId
      },
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          that.setData({
            registeredList:res.data.lists
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
  //点击邀请加入
  goInvite:function(){
    this.setData({
      phoneShow:true
    })
  },
  //点击遮罩层
  cancel:function(){
    this.setData({
      phoneShow: false
    })
  },
  //确认邀请
  confirmSubmit:function(e){
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    var that=this;
    console.log(e);
    if (e.detail.value.phone == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phone))) {
      warn = "手机号码格式不正确！";
    } else{
      flag = false;//若必要信息都填写，则不用弹框，且页面可以进行跳转
      wx.request({
        url: 'http://test.tuolve.com/jingsai/web/api.php/Borrow/yaoqing',
        data: {
          book_id: that.data.matchId,
          group_id: that.data.projectId,
          group: e.currentTarget.dataset.group,//组名//还需一个手机号
          phone: e.detail.value.phone,
        },
        success: function (res) {
          if(res.data.status==10001){
            wx.showToast({
              title: '邀请成功！',
              icon: 'success',
              duration: 1000,
            })
            that.setData({
              phoneShow: false
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
  //删除已报名人员
  goDelete:function(e){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      confirmColor: '#E51C23',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/del_baoming',
            data: {
              id: e.currentTarget.dataset.peopleid
            },
            success: function (res) {
              if(res.data.status==10001){
                wx.showToast({
                  title: '已删除',
                  icon: 'success',
                  duration: 1000,
                })
                that.onReady();
              }else{
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1000,
                })
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          }) 
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  },
  //设为种子选手
  setseedPlayer:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认设置为种子选手？',
      confirmColor: '#E51C23',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://test.tuolve.com/jingsai/web/api.php/Borrow/set_zhongzi',
            data: {
              user_id: e.currentTarget.dataset.userid,
              book_id:that.matchId,
              group_id:that.projectId,
            },
            success: function (res) {
              if (res.data.status == 10001) {
                wx.showToast({
                  title: '设置成功！',
                  icon: 'success',
                  duration: 1000,
                })
                that.onReady();
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1000,
                })
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  },
  //获取已签到人数
  getSignInNumber:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Borrow/online',
      data: {
        book_id:that.data.matchId,
        group_id:that.data.projectId
      },
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          that.setData({
            signInNumber:res.data.count
          })
        }else{
          wx.showToast({
            title:'签到人数'+res.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      }
    })
  },
  //签到分组
  goGrouping:function(e){
    var that=this;
    console.log(e);
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Borrow/set_zu',
      data: {
        book_id:that.data.matchId,
        group_id:that.data.projectId,
        organize: e.detail.value.goGroupingIndex,
        type:e.detail.target.dataset.type,
      },
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          wx.showToast({
            title: '分组成功！',
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
  /***************************/
  //获取已通过裁判列表
  getRefereeList:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/referee_on_lists',
      data: {
        book_id:that.data.matchId,
        //group_id:that.data.projectId,
      },
      success: function(res) {
        if(res.data.status==10001){
          that.setData({
            refereeList:res.data.lists
          })
        }else{
          wx.showToast({
            title: re.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      }
    })
  },
  //获取所有裁判列表
  getAllRefereeList:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/referee_lists',
      data: {
        book_id:that.data.matchId,
        //group_id:that.data.projectId,
      },
      success: function(res) {
        if(res.data.status==10001){
          that.setData({
            allRefereeList:res.data.lists
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //裁判通过
  goPass:function(e){
    console.log(e);
    var that=this;
    wx.showModal({
      title: '提示',
      content: '请确认通过',
      confirmColor: '#E51C23',
      success: function(res) {
        if (res.confirm) {
          call.request({
            url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/referee_change',
            data: {
              id: e.currentTarget.dataset.refereeid
            },
            success: function (res) {
              if (res.data.status == 10001) {
                wx.showToast({
                  title: '已通过！',
                  icon: 'success',
                  duration: 1000,
                })
                that.onReady();
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1000,
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //拒绝通过
  goRefuse:function(e){
    console.log(e);
    var that = this;
    wx.showModal({
      title: '提示',
      content: '请确认删除',
      showCancel: true,
      confirmColor: '#E51C23',
      success: function (res) {
        if (res.confirm) {
          call.request({
            url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/referee_del',
            data: {
              id: e.currentTarget.dataset.refereeid
            },
            success: function (res) {
              if (res.data.status == 10001) {
                wx.showToast({
                  title: '已删除！',
                  icon: 'success',
                  duration: 1000,
                })
                that.onReady();
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1000,
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /***************************/
  //添加选手照片
  addPlayerPhoto: function () {
    var self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //playerPhoto = tempFilePaths;
        self.setData({ playerPhoto: tempFilePaths })
        console.log(JSON.stringify(res));
      }
    })
  },
  addAlbum: function () {
    var self = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //playerPhoto = tempFilePaths;
        self.setData({
          albumPhotos: self.data.albumPhotos.concat(tempFilePaths)
        })
        console.log(JSON.stringify(res));
      }
    })
  },
  addVideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          video: res.tempFilePath,
        })
      }
    })
  },
  moreRank: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      matchId:options.matchId,
      projectId:options.projectId,
    })
    this.getSignInNumber();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAllRefereeList();
    this.getRefereeList();
    this.getRegisteredList();
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