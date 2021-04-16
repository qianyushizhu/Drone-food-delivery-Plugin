// pages/home-page/home-page.js
import{getSwiper_servers,getStore_servers} from '../../servers/servers'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      swiperImgList:[],
      params:{
        "pageNum": 1,
        "pageSize": 10,
        "word": "一号"   
      },
      storeList:[]
  },
  goLogin(){
    if(wx.getStorageSync('accessToken')&&wx.getStorageSync('refreshToken')){
      wx.navigateTo({
        url:'plugin://hello-plugin/order-page',
      })
    }
      wx.navigateTo({
        url:'plugin://hello-plugin/login-page',
      })
    
   
  },
  goStore(e){
      // console.log(e)
      let id=e.currentTarget.dataset.id
      wx.navigateTo({
        url:'plugin://hello-plugin/store-page?id='+id,
      })
  },
  gotip(){
    wx.navigateTo({
      url:'plugin://hello-plugin/tip-page',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  searchOrder(){
    wx.navigateTo({
      url:'plugin://hello-plugin/search-page',
    })
  },
  onLoad: function (options) {
    var _this=this
    getSwiper_servers().then(res=>{
      console.log(res)
      if(res.statusCode==200){
        _this.setData({
          swiperImgList:res.data.data
        })
        console.log(_this.data.swiperImgList)
      }
    })
    getStore_servers(_this.data.params).then(res=>{
      console.log(res)
      if(res.statusCode===200){
        _this.setData({
          storeList:res.data.data.list
        })
        console.log(_this.data.storeList)
      }
    })
    
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