import{storeorderinfoserver_servers,webserver_servers} from '../../servers/servers'
var QQMapWX = require('../../map/qqmap-wx-jssdk.min');
var qqmapsdk;
// import mqtt from '../../utils/mqtt';

// //连接的服务器域名，注意格式！！！
// const host = 'wx://112.124.26.141:8083/mqtt';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      orderNumber:''
    },
    i: 0,
    latitude:"32.07339",
    longitude:"119.00434",
    markers:[],
    polyline:[],
    webserver_local:[],
    username:wx.getStorageSync('name'),
    phone:wx.getStorageSync('telephone'),
    local:wx.getStorageSync('local'),
    orderList:{},

    client: null,
    //记录重连的次数
    reconnectCounts: 0,
    //MQTT连接的配置
    options: {
      protocolVersion: 4, //MQTT连接协议版本
      clientId: [],
      clean: false,
      password: 'Eker5trdkLp2MTT',
      username: 'yuan-antwork-001',
      reconnectPeriod: 1000, //1000毫秒，两次重新连接之间的间隔
      connectTimeout: 30 * 1000, //1000毫秒，两次重新连接之间的间隔
      resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  previewerweima(e){
    
    // console.log(1)
    let src=e.currentTarget.dataset.src
    let result=[]
    let photo=this.data.orderList.storeFoodCode
    // for(let i=0;i<list.length;i++){
    //   result.push(list[i].photo)
    // }
    result.push(photo)
    console.log(result)
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: result// 需要预览的图片http链接列表
    })
  },

  previewuserimg(e){
    let src=e.currentTarget.dataset.src
    let index=e.currentTarget.dataset.index
    
    let result=this.data.orderList.orderImg
    wx.previewImage({
      current: result[index], // 当前显示图片的http链接
      urls: result// 需要预览的图片http链接列表
    })
  },
  onLoad: function (options) {
    var that=this
    this.mapCtx = wx.createMapContext('mymap');
    

    // //开始连接
    // this.data.client = mqtt.connect(host, this.data.options);
    // this.data.client.on('connect', function(connack) {
    //   // wx.showToast({
    //   //   title: '连接成功'
    //   // }) 
    //   console.log("连接成功")

      
    // })
    //   //仅订阅单个主题
    //   that.data.client.subscribe('UAV/RTS/GPS/+/', function(err, granted) {
    //     if (!err) {
    //       // wx.showToast({
    //       //   title: '订阅主题成功'
    //       // })
    //       console.log('订阅成功')
    //     } else {
    //       wx.showToast({
    //         title: '订阅主题失败',
    //         icon: 'fail',
    //         duration: 2000
    //       })
    //     }
    //   })
    
   
    //  //服务器下发消息的回调
    //  that.data.client.on("message", function(topic, payload) {
    //   // console.log(" 收到 topic:" + topic + " , payload :" + payload)
    //   // wx.showModal({
    //   //   content: " 收到topic:[" + topic + "], payload :[" + payload + "]",
    //   //   showCancel: false,
    //   // });
    //     console.log(JSON.parse(payload.toString()))
        
    // })


    // //服务器连接异常的回调
    // that.data.client.on("error", function(error) {
    //   console.log(" 服务器 error 的回调" + error)

    // })

    // //服务器重连连接异常的回调
    // that.data.client.on("reconnect", function() {
    //   console.log(" 服务器 reconnect的回调")

    // })


    // //服务器连接异常的回调
    // that.data.client.on("offline", function(errr) {
    //   console.log(" 服务器offline的回调")

    // })



  //   qqmapsdk = new QQMapWX({
  //     key: 'VR6BZ-RKWC3-DF436-3GTIF-VIGXS-H4BG3'
  // });
  
  webserver_servers(options.code).then(res=>{
    if(res.data.code===0){
                  let list = res.data.data
                  console.log(list[0].latitude)
                    console.log(res.data.data)
                    const points = list
                    console.log(points)
                    // 标记点集合
                    let markers = points;
                    let newList = []
                    for(let index =0;index<markers.length;index++){
                      let obj = {}
                      obj.id = index + 1
                      obj.width = 20
                      obj.height = 20
                      obj.longitude = markers[index].longitude
                      obj.latitude = markers[index].latitude
                      if( index==0 ){
                        obj.iconPath = 'https://locatorsys.oss-cn-qingdao.aliyuncs.com/locatorsys/2021-04-06/16176967733633536.png'
                      }
                      else if(index == points.length-1){
                        obj.iconPath = 'https://locatorsys.oss-cn-qingdao.aliyuncs.com/locatorsys/2021-04-06/16176968939337746.png'
                      }
                      else{              
                        obj.width = 15
                        obj.height = 15
                        obj.iconPath = 'https://locatorsys.oss-cn-qingdao.aliyuncs.com/locatorsys/2021-04-06/16176967733633536.png'
                      } 
                      newList.push(obj)
                    }
                    markers  = newList
                    // console.log(newMarkers)
                    that.setData({
                      polyline: [{
                        points: points,
                        color: "#156FF2",
                        width: 2,
                      }],
                      markers: markers,
                      latitude: points[0].latitude,
                      longitude: points[0].longitude
                    })
                    console.log('11')
                    console.log(markers)
                    that.translateMarker(markers);
                    // wx.hideLoading();
            }
            })


        console.log(options)
        this.setData({
          params:{
            orderNumber:options.code
          }
        })
        
        storeorderinfoserver_servers(options).then(res=>{
          console.log(res)
          if(res.statusCode==200){
            that.setData({
              orderList:res.data.data
            })
            // console.log(_this.data.swiperImgList)
            console.log(this.data.orderList)
          }
        })

        this.setData({
          username:wx.getStorageSync('name'),
          phone:wx.getStorageSync('telephone'),
          local:wx.getStorageSync('local'),
        })
  },


  translateMarker: function(markers) {
        // console.log(1)
        let that = this;
        let markerId = markers[that.data.i].id;
        let destination = {
          longitude: markers[that.data.i + 1].longitude,
          latitude: markers[that.data.i + 1].latitude
        };
        let getDistance = that.getDistance(markers[that.data.i].latitude, markers[that.data.i].longitude, markers[that.data.i + 1].latitude, markers[that.data.i + 1].longitude);
        let duration = getDistance * 20; // 根据距离计算平移的速度，看起来保持匀速
        this.mapCtx.translateMarker({
          markerId: markerId,
          destination: destination,
          autoRotate: true,
          rotate: 30,
          duration: duration,
          success(res) {
            that.setData({
              i: that.data.i + 1
            });
            // 小于长度减1才执行
            if (that.data.i < markers.length - 1) {
              that.translateMarker(markers);
            }
          },
          fail(err) {
            console.log('fail', err)
          }
        })
      },
      
      getDistance: function(lat1, lng1, lat2, lng2) {
        let rad1 = lat1 * Math.PI / 180.0;
        let rad2 = lat2 * Math.PI / 180.0;
        let a = rad1 - rad2;
        let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        let r = 6378137;
        return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)
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