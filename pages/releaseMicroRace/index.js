// pages/releaseMicroRace/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos: [],
    tempFilePaths:[],
    textContent:'',//输入框内容
  },
  //添加照片
  addPhotos: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //photos = tempFilePaths;
        console.log(tempFilePaths);
        that.setData({ 
          tempFilePaths: tempFilePaths,
          photos: that.data.photos.concat(tempFilePaths)
        
        })
        console.log(that.data.photos);
        console.log(JSON.stringify(res));
      }
    })
  },
  //输入框·失去焦点
  bindTextAreaBlur:function(e){
    var that=this;
    console.log(e.detail.value);
    that.setData({
      textContent: e.detail.value
    })
    console.log(that.data.textContent);
  },
  //发布
  goRelease:function(){
    var that = this;
    console.log(that.data.tempFilePaths);
    if(that.data.textContent=='') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 1000,
      })
    }else{
      if (that.data.tempFilePaths == '') {
        
      } else {
        wx.showLoading({
          title: '上传中',
        });
        wx.request({
          url: 'http://test.tuolve.com/jingsai/web/api.php/Cms/add',
          data: {
            context: that.data.textContent,
            img_orogin: this.data.photos
          },
          success: function (res) {
            if(res.data.status==10001){
              wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 1000,
              })
            }
            else{
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1000,
              })
            }
            console.log(res)
            wx.hideLoading();
          },
        })
        //wx.uploadFile({
          //url: 'http://test.tuolve.com/jingsai/web/api.php/Plus/upload_img',
          //filePath: that.data.photos,
          //name: 'photos',
          //formData: {
          //},
          //success(res) {
          //  console.log(res);
          //}
        //})
      }
      
    }
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