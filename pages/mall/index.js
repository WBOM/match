// pages/mall/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    sponsorId:'',//赞助商id
    sponsorInfo:'',//赞助商信息
    commodityList:[],//商品列表
    otherMatchList:[],
  },
  //获取赞助商信息
  getSponsorInfo:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Sponsor/spon_detail',
      data: {
        id:that.data.sponsorId
      },
      success: function(res) {
        if(res.data.status==10001){
          that.setData({
            sponsorInfo: res.data.detail
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
  //获取商品列表
  getCommodityList:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/ShopGoods/lists',
      data: {
        business_id:that.data.sponsorId
      },
      success: function(res) {
        if(res.data.status==10001){
          that.setData({
            commodityList: res.data.lists
          })
        }
      }
    })
  },
  /* 加数 */
  addCount: function (e) {
    var index = e.target.dataset.index;
    console.log("刚刚您点击了加+");
    var count = this.data.items[index].count;
    // 商品总数量+1  
    if (count < 10) {
      this.data.items[index].count++;
    }
    // 将数值与状态写回  
    this.setData({
      items: this.data.items
    });
    console.log("items:" + this.data.items);
  },
  /* 减数 */
  delCount: function (e) {
    var index = e.target.dataset.index;
    console.log("刚刚您点击了加一");
    var count = this.data.items[index].count;
    // 商品总数量-1
    if (count > 1) {
      this.data.items[index].count--;
    }
    // 将数值与状态写回  
    this.setData({
      items: this.data.items
    });
    console.log("items:" + this.data.items);
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  //获取他赞助的其他赛事
  getOtherMatchList:function(){
    var that=this;
    wx.request({
      url: 'http://test.tuolve.com/jingsai/web/api.php/Sponsor/spon_book',
      data: {
        id:that.sponsorId
      },
      success: function(res) {
        console.log(res);
        if(res.data.status==10001){
          that.setData({
            otherMatchList:res.data.detail
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
  //跳转到结算订单确认页面
  goOrder:function(){
    wx.navigateTo({
      url: '../order/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sponsorId: options.sponsorId
    })
    this.getOtherMatchList();
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