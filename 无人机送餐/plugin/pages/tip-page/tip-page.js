// pages/tip-page/tip-page.js
import{getSwiper_servers} from '../../servers/servers'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgList:[],
    currentindex:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
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