const getBaseUrl = (url) => {
  let BASE_URL = '';
  // if (process.env.NODE_ENV === 'development') {
  //   BASE_URL = 'http://183.156.154.217:8081/cloud_job/'

  // } else {
    
  //   BASE_URL = 'http://183.156.154.217:8081/cloud_job/'
  // }
  // BASE_URL = 'http://192.168.2.107:9005/order_food'
  BASE_URL = 'https://www.hmaq.top/order_food'
  return BASE_URL
}

export default getBaseUrl;
