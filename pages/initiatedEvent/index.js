// pages/initiatedEvent/index.js
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'ZZGBZ-TZMWO-ERXWW-STIMW-73LSS-VCFIU'//申请的开发者秘钥key
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeEventList: [{ title: '新增' }],
    teamModeId:0,
    typeEventIndex:1,//赛事类型index
    typeEventId:'',//赛事类型ID
    matchClassList:[],//比赛类型
    matchClassIndex:0,
    matchClassId: '',//比赛类型ID
    teamModeList: ['自由组队', '随机分组'],
    startDate: '2019-01-01',
    endDate:'2019-01-01',
    address:'',
    projectNumber: [{}],
    projectLists:[],
    tempFilePaths: '',
    albumPhotos: [],
    video: '',
  },
  //获取赛事类型
  getTypeEventList:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/get_fenlei',
      data: {
        user_id:'',//需要用户的分类
      },
      success: function(res) {
        console.log(res.data.lists);
        if(res.data.status==10001){
          that.setData({
            typeEventList: that.data.typeEventList.concat(res.data.lists)
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取比赛种类
  getMatchClassList: function () {
    var that = this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookCategory/lists',
      data: {

      },
      success: function (res) {
        console.log(res.data.data);
        if (res.data.status == 10001) {
          that.setData({
            matchClassList:res.data.data
          })
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
  },
  //赛事种类
  bindTypeEventChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if(e.detail.value==0){
      wx.navigateTo({
        url: '../manageClass/index',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      this.setData({
        typeEventIndex: e.detail.value
      })
    }  
  },
  //比赛种类
  bindMatchClassChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
     matchClassIndex: e.detail.value
    })
  },
  //团队组队方式
  bindTeamModeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      teamModeId: e.detail.value
    })
  },
  //赛事开始时间
  bindStartDateChange(e) {
    console.log('startDate发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  //赛事结束时间
  bindEndDateChange(e) {
    console.log('endDate发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  //地图
  onChangeAddress:function(){
    wx.chooseLocation({
      success: function (res) {
        wx.getLocation({
          success: function (res) {
            console.log(res);
            qqmapsdk.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success: function (res) {
                //获取当前地址成功
                console.log(res);
                address:res;
              },
              fail: function (res) {
                console.log('获取当前地址失败');
              }
            });
          },
        })
      },
    })
  },
  //添加项目
  addList: function () {
    var lists = this.data.projectNumber;
    var newData = {};
    lists.push(newData);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      projectNumber: lists,
    })
  },
  //删除项目
  delList: function () {
    var lists = this.data.projectNumber;
    if (lists.length<=1){
      wx.showModal({
        title: '提示',
        content: '项目不能小于一项',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      lists.pop();      //实质是删除lists数组内容，使for循环少一次
      this.setData({
        projectNumber: lists,
      })
    };
  },
  //添加照片
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
  //添加视频
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
  formSubmit: function (e) {
    var that=this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    //判断的顺序依次是：
    if (e.detail.value.titleEvent == ""){
      warn = "请填写您发布的比赛标题！";
    } else if (e.detail.value.startDate>e.detail.value.endDate){
      warn = "开始时间不能超过结束时间！";
    } else if (e.detail.value.location ==""){
      warn = "请输入或选着赛事地点！";
    }else {
      flag = false;//若必要信息都填写，则不用弹框，且页面可以进行跳转
      var that = this;
      wx.request({
        url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/add_action',
        data: {
          fenlei_id: e.detail.value.typeEvent,
          title: e.detail.value.title,
          starttime: e.detail.value.startDate,
          endtime: e.detail.value.endDate,
          address: e.detail.location,
          cate_id: e.detail.matchClass,
          team_xzrs: e.detail.numberPeople0,//某个项目的总人数
          team_type:e.detail.
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
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
    this.getTypeEventList();
    this.getMatchClassList();
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