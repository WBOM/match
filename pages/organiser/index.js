// pages/organiser/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList: ['A组', 'B组', 'C组', 'D组'],
    siteList:['陆地','海洋','天空'],
    refereeList:['1号','2号','3号'],//裁判列表
    groupIndex: 0,
    siteIndex:0,
    refereeIndex: 0,
    currentTab: 0,
    date: '2019-01-01',
    time: '12:00',
    ranking:true,
    playerPhoto:"../image/increase.png",
    tempFilePaths:'',
    albumPhotos: ['../image/increase.png'],
    video:'',
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
  bindSiteListChange:function(e){
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
  //添加选手照片
  addPlayerPhoto:function(){
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
  addAlbum:function(){
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
  moreRank:function(){

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