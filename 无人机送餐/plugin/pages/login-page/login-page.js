// pages/login-page/login-page.js
import{login_servers}from '../../servers/servers'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      telephone:"",
      password:''
    },
    phonenum:'',
    ispassword:true,
    passwordnum:''
    
  },
  ispassWord(){
    let ifBool = this.data.ispassword
    this.setData({
      ispassword:!ifBool
    })
   
    // this.data.ispassword=!this.data.ispassword
  },
  checkphone(){
    var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    let phone = this.data.params.telephone;
    if(!reg_tel.test(phone)){ 
      wx.showToast({
        title: '手机号格式不对',
        icon:'none'
      })
    } 
  },
  getPassWord(e){
    // console.log(e)
    console.log(e.detail.value)
    let password="params.password"
    this.setData({
      [password]:e.detail.value
    })
  },
  getPhone(e){
    console.log(e.detail.value)
    let telephone ="params.telephone"
    this.setData({
      // params:{
      //   password:e.detail.value
      // }
      [telephone]:e.detail.value
    })
  },
  login(){
    var _this=this
    console.log(this.data.params.password)
    console.log(this.data.params.telphone)
    login_servers(this.data.params).then(res=>{
      console.log(res)
      if(res.statusCode!==200){
        wx.showToast({
          title: '用户名密码不匹配',
        })
      }
      
      if(res.statusCode===200){
        wx.setStorageSync('accessToken', res.data.data.accessToken)
        wx.setStorageSync('refreshToken', res.data.data.refreshToken)
        wx.setStorageSync('createUserId', res.data.data.createUserId)
        wx.setStorageSync('icon', res.data.data.icon)
        wx.setStorageSync('id', res.data.data.id)
        wx.setStorageSync('local', res.data.data.local)
        wx.setStorageSync('name', res.data.data.name)
        wx.setStorageSync('telephone', res.data.data.telephone)
        wx.navigateTo({
          url:'plugin://hello-plugin/order-page',
        })
        _this.setData({
          phonenum:'',
          passwordnum:''
        })
        wx.showToast({
          title: '登录成功',
        })
      }else{
        wx.navigateTo({
          url:'plugin://hello-plugin/login-page',
        })
      }
      
        
      
      
    }).catch(res=>{
      wx.navigateTo({
        url:'plugin://hello-plugin/login-page',
      })
      
    })
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