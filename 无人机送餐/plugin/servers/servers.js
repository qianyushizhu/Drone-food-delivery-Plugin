import HTTPREQUEST from "./http"


export const getSwiper_servers = (params) => {
  return HTTPREQUEST.get('/carousel/getInUse', params)
}
export const getStore_servers = (params) => {
  return HTTPREQUEST.post('/store/pageInfo', params)
}
export const login_servers = (params) => {
  return HTTPREQUEST.post('/store/login', params)
}
export const nogoing_servers = (params) => {
  return HTTPREQUEST.get('/order/ongoing', params)
}
export const over_servers = (params) => {
  return HTTPREQUEST.get('/order/ongoing', params)
}
export const new_servers = (params) => {
  return HTTPREQUEST.post('/order', params)
}
export const search_servers = (params) => {
  return HTTPREQUEST.get('/order/selectByOrderNumber/'+params.orderNumber)
}
export const store_servers = (params) => {
  return HTTPREQUEST.get('/store/getDetail/'+params)
}
export const webserver_servers = (params) => {
  return HTTPREQUEST.get('/order/travel/'+params)
}
export const storeorderinfoserver_servers = (params) => {
  return HTTPREQUEST.get('/order/storeSelectByOrderNumber/'+params.code)
}

export const getAirportserver_servers = (params) => {
  return HTTPREQUEST.post('/order/getAirport',params)
}



