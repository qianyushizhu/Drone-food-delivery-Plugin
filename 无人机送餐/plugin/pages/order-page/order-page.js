// pages/order-page/order-page.js
import{getSwiper_servers,nogoing_servers,over_servers}from '../../servers/servers'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      swiperList:[],
      currentindex:1,
      goingList:[],
      overList:[]
  },
  setclass1(){
    this.setData({
      currentindex:1
    })
  },
  setclass2(){
    this.setData({
      currentindex:2
    })
  },
  gonew(){
    wx.navigateTo({
      url:'plugin://hello-plugin/new-page',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if(wx.getStorageSync('accessToken')&&wx.getStorageSync('refreshToken')){
    //   wx.navigateTo({
    //     url:'plugin://hello-plugin/order-page',
    //   })
    // }else{
    //   wx.navigateTo({
    //     url:'plugin://hello-plugin/login-page',
    //   })
    // }
      
    
    var _this=this
    getSwiper_servers().then(res=>{
      console.log(res)
      if(res.statusCode==200){
        _this.setData({
          swiperList:res.data.data
        })
        console.log(_this.data.swiperList)
      }
    })
    nogoing_servers().then(res=>{
      console.log(res)
      if(res.statusCode===200){
        _this.setData({
          goingList:res.data.data
        })
      }
    })
    over_servers().then(res=>{
      if(res.data.code===0){
        _this.setData({
          overList:res.data.data
        })
      }
    })
  },
 goOrderInfo(e){
  console.log(e)
  let code=e.currentTarget.dataset.code
  wx.navigateTo({
    url:'plugin://hello-plugin/store-orderInfo-page?code='+code,
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
    // let pages = getCurrentPages().length -1;
    // console.log('需要销毁的页面：'+pages);
    if(wx.getStorageSync('accessToken')&&wx.getStorageSync('refreshToken')){
      wx.reLaunch({
        url:'plugin://hello-plugin/home-page',
      })
    }
    
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