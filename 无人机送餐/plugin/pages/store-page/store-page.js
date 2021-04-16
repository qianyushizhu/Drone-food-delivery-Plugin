// pages/store-page/store-page.js
import{store_servers}from '../../servers/servers'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      storeList:{},
      isclone:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  clonetext(e){
    let text=e.currentTarget.dataset.text
      wx.setClipboardData({
        data: text,
        success(res){
          wx.getClipboardData({
            success: (option) => {
              
            },
          })
        }
      })
  },
  onLoad: function (options) {
    console.log(options)
    var _this=this
    store_servers(options.id).then(res=>{
      console.log(res)
        _this.setData({
          storeList:res.data.data
        })
    })
  },
  preview(e){
    var _this=this
    // console.log(1)
    let src=e.currentTarget.dataset.src
    let result=[]
    let list=this.data.storeList.storeLeaderRespVOList
    for(let i=0;i<list.length;i++){
      result.push(list[i].photo)
    }
    console.log(result)
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: result// 需要预览的图片http链接列表
    })
  },
  storepreview(e){
    let src=e.currentTarget.dataset.src
    let result=[]
    let list=this.data.storeList.storeCertRespVOList
    for(let i=0;i<list.length;i++){
      result.push(list[i].certPhoto)
    }
    wx.previewImage({
      current: src, 
      urls: result
    })
  },
  byphone(e){
      console.log(e)
      let phone=e.currentTarget.dataset.phone
      wx.makePhoneCall({
        phoneNumber: phone,
      })
  },
  storepreviewlocal(e){
    let src=e.currentTarget.dataset.src
    let result=[]
    let list=this.data.storeList.storeSceneRespVOList
    for(let i=0;i<list.length;i++){
      result.push(list[i].img)
    }
    wx.previewImage({
      current: src, 
      urls: result
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