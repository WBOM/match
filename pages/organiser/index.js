// pages/organiser/index.js
import call from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId:'',
    projectId:'',//项目ID
    groupList: [{group_name: 'A组'}, {group_name: 'B组'}, {group_name: 'C组'}, {group_name: 'D组'}],
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
    signInNumber:0,//签到人数
    groupingType: [
      { index: 2, value: '不混抽分组', checked: 'true' },
      { index:1,value:'混抽分组'},
      { index:3,value:'团体随机分组'}
    ],
    group:'',
    status:'',//报名状态
    end:false,  
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
    var that=this;
    that.setData({
      groupIndex: e.detail.value,
      group: that.data.groupList[e.detail.value].group_name
    })
    console.log(that.data.group);
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
  
  //获取分组列表
  getGroupList:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Borrow/get_group',
      data: {
        book_id:that.data.matchId,
        group_id:that.data.projectId
      },
      success: function(res) {
        console.log(res)
        if(res.data.status==10001){
          that.setData({
            groupList:res.data.lists,
            group: res.data.lists[0].group_name
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
  //获取报名状态
  getStatus:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookLists/lists',
      data: {
        book_id: that.data.matchId,
        group_id: that.data.projectId
      },
      success: function(res) {
        console.log(res);
        if (res.data.lists[0].is_over==1){
          that.setData({
            end:false
          })
        } else if (res.data.lists[0].is_over == 2){
          that.setData({
            end: true
          })
        }
      }
    })
  },
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
  goInvite:function(e){
    var that=this;
    wx.showShareMenu({
      withShareTicket: true
    })
    console.log(e);
  },
  /**
  * 用户点击分享
  */
  onShareAppMessage: function (ops) {
    var that=this;
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '我邀请了你参加一场比赛，快快加入吧！',
      path: 'pages/matchDetails/index?matchId='+ that.data.matchId,
      imageUrl: 'pages/image/index.png',
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {//判断分享是否成功
          if (res.shareTickets == undefined) {//判断分享结果是否有群信息
            //分享到好友操作...
          } else {
            //分享到群操作...
            var shareTicket = res.shareTickets[0];
            wx.getShareInfo({
              shareTicket: shareTicket,
              success: function (e) {
                //当前群相关信息
                var encryptedData = e.encryptedData;
                var iv = e.iv;
              }
            })
          }
        }
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
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
  ///报名结束
  goEnd:function(){
    var that=this;
    wx.showModal({
      title: '提示·',
      content: '确认结束报名？',
      showCancel: true,
      confirmColor: '#E51C23',
      success: function(res) {
        if(res.confirm){
          call.request({
            url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/book_over',
            data: {
              book_id: that.data.matchId,
              group_id: that.data.projectId,
            },
            success: function (res) {
              if (res.data.status == 10001) {
                wx.showToast({
                  title: '操作成功',
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
        } else if(res.cancel){
          console.log('用户点击取消')
        }
      }
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
        group_id:that.data.projectId,
      },
      success: function(res) {
        if(res.data.status==10001){
          that.setData({
            refereeList:res.data.lists
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
  //获取所有裁判列表
  getAllRefereeList:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/BookInfo/referee_lists',
      data: {
        book_id:that.data.matchId,
        group_id:that.data.projectId,
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
    this.getGroupList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAllRefereeList();
    this.getRefereeList();
    this.getRegisteredList();
    this.getStatus();
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