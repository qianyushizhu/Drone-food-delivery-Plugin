
import{getSwiper_servers,search_servers} from '../../servers/servers'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgList:{},
    inputvalue:'',
    params:{
      orderNumber:''
    },
    isshow:false,
    isclean:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  valuenone(){
    this.setData({
      isclean:false
      
    })
  },
  cleanvalue(){
    this.setData({
      isclean:true
    })
  },
  cleantext(){
    // console.log(1)
    this.setData({
      inputvalue:'',
      
    })
  },
  getordervalue(e){
    let result=e.detail.value
    console.log(result)
    this.setData({
      params:{
        orderNumber:result
      },
      orderList:[]
    })
    
  },
  goorderinfo(e){
    let code=e.currentTarget.dataset.code
    wx.navigateTo({
      url:'plugin://hello-plugin/orderInfo-page?code='+code,
    })
  },
  getvalue(){
    console.log(this.data.params)
    var that=this
    console.log(this.data.params.orderNumber)
    search_servers(this.data.params).then(res=>{
      console.log(res)
      if(res.statusCode==200){
        that.setData({
          orderList:res.data.data,
          isshow:true
        })
        // console.log(_this.data.swiperImgList)
        console.log(this.data.orderList)
      }
    })
    // wx.request({
    //   url: ' https://www.hmaq.top/order_food/order/selectByOrderNumber/'+this.data.params.orderNumber,
    //   method:'GET',
    //   header:{
    //   //  "Content-Type":"application/x-www-form-urlencoded",
    //    authorization:wx.getStorageSync('accessToken')
    //  },
    //  success(res){
       
    //    console.log(res)
    //    that.setData({
        
    //    })
     
    //  }
    // })
    // console.log(1)
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