// pages/new-page/new-page.js
import{new_servers,getAirportserver_servers} from '../../servers/servers'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isclick:false,
    localresult:'请选择起降点（选填）',
    currentindex:0,
    isshow:false,
    airportList:[],
    isonce:false,
    username:wx.getStorageSync('name'),
    phone:wx.getStorageSync('telephone'),
    local:wx.getStorageSync('local'),
    params:{
      "clientLocal": "南京江宁东山桥 xxx街道 xxx号",  //客户地址
      "clientName": "王先生",   //客户名称
      "clientTelephone": 111111111,   //客户电话
      "foodName": "大娘水饺",  
      orderImgList:[],
      "remarks": "备注备注备注备注备注备注备注备注",
      airportId:'',
      airportName:''
    },
    tempIndex:"",
    issuccess1:false,
    issuccess2:false,
    issuccess3:false,
    imgPaths:[
      

    ],
    addList:[
      {
        type:"餐品名：",
        value:'',
        addtext:"增加商品"
      }
    ]
  },
  closesssss(){
    this.setData({
      isshow:false,
      isclick:true
    })

  },
  clickcurrentindex(e){
      let index=e.currentTarget.dataset.index
      let id=e.currentTarget.dataset.id
      let name=e.currentTarget.dataset.name
      console.log(e)
      let result='params.airportId'
      let result1='params.airportName'
      this.setData({
        currentindex:index,
        [result]:id,
        [result1]:name,
        localresult:name
      })
      
  },
  closedelog(){
    this.setData({
      isshow:false
    })
  },
  opendlog(){
    this.setData({
      isshow:true
    })
  },
  
  getusername(e){
    // console.log(e)
    let result=e.detail.value
    let clientName="params.clientName"
    this.setData({
      [clientName]:result
    })
  },
  getuserphone(e){
    let result=e.detail.value
    let clientTelephone="params.clientTelephone"
    this.setData({
      [clientTelephone]:result
    })
    console.log(e.detail.value)
  },
  getuserlocal(e){
    let result=e.detail.value
    let clientLocal="params.clientLocal"
    this.setData({
      [clientLocal]:result
    })
    console.log(this.data.params.clientLocal)
  },
  getuserfood(e){
    console.log(e)
    let list = this.data.addList
    let index = this.data.tempIndex
    console.log(list)
    list[index].value = e.detail.value
    console.log(list)
    this.data.addList = list
    const result=[]
    for(let i=0;i<list.length;i++){
       result.push(list[i].value)   
    }
    console.log(result)
    let overresult=result.join(',')
    console.log(overresult)
    // this.data.addList[e.target.index].value=e.detail.value
  //  console.log(aa)
    // let result=e.detail.value
    let foodName="params.foodName"
    // // console.log(result)
    this.setData({
      [foodName]:overresult
    })
    console.log(this.data.params.foodName)
    // console.log(this.data.addList)
  },
  getindex(e){
    console.log(e.currentTarget.dataset.index)
    this.data.tempIndex = e.currentTarget.dataset.index
  },
  addinput(){
    const a={
      type:"餐品名",
      value:'',
      addtext:"增加商品："
    }
    let list = this.data.addList
    list.push(a)
    for(let i=1;i<this.data.addList.length;i++){
      list[i-1].addtext= ''
    }
  this.setData({
    addList:list
  })
  
  console.log(this.data.addList)
  },
  findindex(arr,obj) {
    let i = arr.length;
    while (i--) {
     if (arr[i] === obj) {
      return i;
     }
    }
    return false;
  },
  deleteImg1(e){
    var that=this
    // console.log(e.currentTarget.dataset.imgsrc)
    let currentimg=e.currentTarget.dataset.imgsrc
    let images=that.data.imgPaths
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          images.splice(that.findindex(images,currentimg), 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          imgPaths:images,
          issuccess1:false
        });
      }
    })



  },
  deleteImg2(e){
    var that=this
    // console.log(e.currentTarget.dataset.imgsrc)
    let currentimg=e.currentTarget.dataset.imgsrc
    let images=that.data.imgPaths
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          images.splice(that.findindex(images,currentimg), 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          imgPaths:images,
          issuccess2:false
        });
      }
    })



  },
  deleteImg3(e){
    var that=this
    // console.log(e.currentTarget.dataset.imgsrc)
    let currentimg=e.currentTarget.dataset.imgsrc
    let images=that.data.imgPaths
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          images.splice(that.findindex(images,currentimg), 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          imgPaths:images,
          issuccess3:false
        });
      }
    })



  },
  
  preview(e){
    console.log(e)
    var _this=this
  
    let src=e.currentTarget.dataset.src
    let index=e.currentTarget.dataset.index
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: _this.data.imgPaths// 需要预览的图片http链接列表
    })

  },
  upload_img1(e){

    var that=this
  wx.chooseImage({
    sizeType:['compressed'],
    success(res){
      let tempFilePaths=res.tempFilePaths
      that.setData({
        imgPaths: that.data.imgPaths.concat(res.tempFilePaths)
    });
      
      console.log(that.data.imgPaths)
      wx.uploadFile({
        filePath: tempFilePaths[0],
        name: 'file',
        data:'图片',
        url: 'https://www.hmaq.top/order_food/file',
        header:{
          "Content-Type":"applciation/json",
          authorization:wx.getStorageSync('accessToken')
        },


        formData:{
          "user":"test"
        },
        success(res1){
          let data=JSON.parse(res1.data)
          console.log(data)
          console.log('success')
          // let imgPaths="imgPaths"
          let imgpath=that.data.params.orderImgList.push(data.data)
          let orderlist=that.data.params.orderImgList
          
          that.setData({
            issuccess1:true,
            orderlist:imgpath
          })
          console.log(that.data.params.orderImgList)
        }
      })
    }
    })
  },
  upload_img2(e){
    
    var that=this
  wx.chooseImage({
    sizeType:['compressed'],
    success(res){
      let tempFilePaths=res.tempFilePaths
      that.setData({
        imgPaths: that.data.imgPaths.concat(res.tempFilePaths)
    });
      console.log(that.data.imgPaths)
      wx.uploadFile({
        filePath: tempFilePaths[0],
        name: 'file',
        data:'图片',
        url: 'https://www.hmaq.top/order_food/file',
        header:{
          "Content-Type":"applciation/json",
          authorization:wx.getStorageSync('accessToken')
        },


        formData:{
          "user":"test"
        },
        success(res1){
          let data=JSON.parse(res1.data)
          console.log(data)
          console.log('success')
          // let imgPaths="imgPaths"
          let imgpath=that.data.params.orderImgList.push(data.data)
          let orderlist=that.data.params.orderImgList
          
          that.setData({
            issuccess2:true,
            orderlist:imgpath
          })
          console.log(that.data.params.orderImgList)
        }
      })
    }
    })
  },
  upload_img3(e){
    console.log(e)
    var that=this
  wx.chooseImage({
    sizeType:['compressed'],
    success(res){
      let tempFilePaths=res.tempFilePaths
      that.setData({
        imgPaths: that.data.imgPaths.concat(tempFilePaths)
    });
      console.log(that.data.imgPaths)
      wx.uploadFile({
        filePath: tempFilePaths[0],
        name: 'file',
        data:'图片',
        
        url: 'https://www.hmaq.top/order_food/file',
        header:{
          "Content-Type":"applciation/json",
          authorization:wx.getStorageSync('accessToken')
        },


        formData:{
          "user":"test"
        },
        success(res1){
          let data=JSON.parse(res1.data)
          console.log(data)
          console.log('success')
          // let imgPaths="imgPaths"
          let imgpath=that.data.params.orderImgList.push(data.data)
          let orderlist=that.data.params.orderImgList
          
          that.setData({
            issuccess3:true,
            orderlist:imgpath
          })
          console.log(that.data.params.orderImgList)
        }
      })
    }
    })
  },
  addGoods(){
    console.log('2')
    var that=this
    this.setData({
      isonce:true
    })
  //  addNewGoods()
    new_servers(this.data.params).then(res=>{
      console.log(res)
     
      if(res.data.code == 0){
       console.log('3')
        wx.navigateTo({
          url:'plugin://hello-plugin/order-page',
        })
        wx.showToast({
          title: '创建成功',
        })
       
      }else{
        that.setData({
          isonce:false
        })
        wx.showToast({
                title: res.data.msg,
                icon: 'none',
              })
        console.log('1')
       
      }
        
      
    })
     
      
        
    
  
  },
  onLoad: function (options) {
    var _this=this
   this.setData({
     
    username:wx.getStorageSync('name'),
    phone:wx.getStorageSync('telephone'),
    local:wx.getStorageSync('local'),

   })
   getAirportserver_servers({
    "clientLocal":_this.data.params.clientLocal
   }).then(res=>{
    console.log(res)
    if(res.data.code==0){
      this.setData({
        airportList:res.data.data
      })
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