import getBaseUrl from './baseUrl'


class httpRequest {
  baseOptions(params, method = "GET") {
    let { url, data } = params;
    // 获取token
    const token = wx.getStorageSync('accessToken')
    const refreshToken = wx.getStorageSync('refreshToken')
    const BASE_URL = getBaseUrl(url);
    let contentType = "application/json";
    
    contentType = params.contentType || contentType;
    console.log(BASE_URL + url)
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        authorization: token,
        refresh_token:refreshToken
      }
    };
    return new Promise((resolve, reject) => {
      wx.request({
        url: option.url,
        data: option.data,
        method: option.method,
        header: option.header,
        success(res) {
          resolve(res);
          //请求成功
          //判断状态码---code状态根据后端定义来判断
          if (res.data.code == 0) {
              resolve(res);
          } else if(res.data.code == 3000003 ) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
              })
              console.log('123')
              // reject('运行时错误,请稍后再试');
              wx.navigateTo({
                url:'plugin://hello-plugin/login-page',
              })
          }
          else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
          }
      },
      fail(err) {
          //请求失败
          reject(err)
      }
      })
    })
  }

  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }
  

  post(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, contentType, data = "") {
    let option = { url, contentType, data };
    return this.baseOptions(option, "DELETE");
  }

}

export default new httpRequest()