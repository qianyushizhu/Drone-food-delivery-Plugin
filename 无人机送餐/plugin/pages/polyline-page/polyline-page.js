// // pages/polyline/polyline.js
// var app = getApp();
// var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
// var qqmapsdk;
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     markers:[
//     ],
//     latitude:wx.getStorageSync(app.acache.latitude),
//     longitude:wx.getStorageSync(app.acache.longitude),
//     polyline:[],
//     location:[],
//     id:"",
//     i: 0,
//     list:[]
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     if(options.id){
//         this.data.id = options.id
//     }
//     qqmapsdk = new QQMapWX({
//       key: 'OARBZ-MHK3G-MRDQF-IFONN-XKLR2-QUFC2'
//     });
//       this.apiOrder()
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
//     this.mapCtx = wx.createMapContext('map');
//   },
//   apiOrder(){
//     const that = this
//     wx.showLoading({
//       title: '努力加载中',
//       mask:true
//     })
//     wx.request({
//       url: app.globalData.host + '/wechatuserorders/orderdetailsselectbyordernum/'+this.data.id,
//       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
//       header: {
//         'content-type': 'application/json',
//         accesstoken:wx.getStorageSync(app.acache.accessToken),
//         refreshtoken:wx.getStorageSync(app.acache.refreshToken)
//       }, // 设置请求的 header
//       // data:this.data.id,
//       success: function(res){
//         // success
//         if(res.data.code == 0){
//             const points = res.data.data.list
//             console.log(points)
//             // 标记点集合
//             let markers = points;
//             let markers1 = [];
//             let newList = []
//             for(let index =0;index<markers.length;index++){
//               let obj = {}
//               obj.id = index + 1
//               obj.width = 20
//               obj.height = 20
//               obj.longitude = markers[index].longitude
//               obj.latitude = markers[index].latitude
//               if( index==0 ){
//                 obj.iconPath = '../../images/start.png'
//               }
//               else if(index == points.length-1){
//                 obj.iconPath = '../../images/end.png'
//               }
//               else{
//                 // obj.iconPath = '../../images/start.png'
//                 obj.width = 15
//                 obj.height = 15
//                 obj.iconPath = '../../images/start.png'
//               } 
//               newList.push(obj)
//             }
//             markers  = newList
//             // console.log(newMarkers)
//             that.setData({
//               polyline: [{
//                 points: points,
//                 color: "#156FF2",
//                 width: 2,
//               }],
//               markers: markers,
//               latitude: points[0].latitude,
//               longitude: points[0].longitude
//             })
//             that.translateMarker(markers);
//             wx.hideLoading();
//         }
//         else{
//            that.setData({
//             latitude:that.data.latitude,
//             longitude:that.data.longitude,
//             polyline:[],
//             markers:[]
//            })
//             wx.showToast({
//               title: res.data.msg,
//               icon:'none'
//             })
//             wx.hideLoading();
//         } 
//       },
//       fail: function() {
//         // fail
//         wx.hideLoading();
//       },
//       complete: function() {
//         // complete
//       }
//     })
//   },

 

//   translateMarker: function(markers) {
//     console.log(markers)
//     let that = this;
//     let markerId = markers[that.data.i].id;
//     let destination = {
//       longitude: markers[that.data.i + 1].longitude,
//       latitude: markers[that.data.i + 1].latitude
//     };
//     let getDistance = that.getDistance(markers[that.data.i].latitude, markers[that.data.i].longitude, markers[that.data.i + 1].latitude, markers[that.data.i + 1].longitude);
//     let duration = getDistance * 20; // 根据距离计算平移的速度，看起来保持匀速
//     this.mapCtx.translateMarker({
//       markerId: markerId,
//       destination: destination,
//       autoRotate: true,
//       rotate: 30,
//       duration: duration,
//       success(res) {
//         that.setData({
//           i: that.data.i + 1
//         });
//         // 小于长度减1才执行
//         if (that.data.i < markers.length - 1) {
//           that.translateMarker(markers);
//         }
//       },
//       fail(err) {
//         console.log('fail', err)
//       }
//     })
//   },

//   getDistance: function(lat1, lng1, lat2, lng2) {
//     let rad1 = lat1 * Math.PI / 180.0;
//     let rad2 = lat2 * Math.PI / 180.0;
//     let a = rad1 - rad2;
//     let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
//     let r = 6378137;
//     return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)
//   },
  
//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//       // this.formSubmit()
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })