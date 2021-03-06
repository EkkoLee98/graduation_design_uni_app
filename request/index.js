import Vue from 'vue'
import qs from 'qs'
import merge from 'lodash/merge'
import axios from 'axios'
const BASE_URL="http://localhost:8081"; //开发时使用本地接口，在上线时只需要修改此处接口为线上地址即可
const SVR_URL="120.25.27.186:12001";
if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
}else{
    console.log('生产环境')
}

axios.defaults.adapter = function(config) {
    return new Promise((resolve, reject) => {
        console.log(config)
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: process.env.NODE_ENV === 'development' ? BASE_URL + buildURL(config.url, config.params, config.paramsSerializer) : SVR_URL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };

                settle(resolve, reject, response);
            }
        })
    })
}

// create an axios instance
const service = axios.create({
    withCredentials: true, // send cookies when cross-domain requests
    // timeout: 5000, // request timeout
    crossDomain: true,
	timeout: 1000 * 30,
	headers: {
	  'Content-Type': 'application/json; charset=utf-8'
	}
})

/**
 * 请求拦截
 */
service.interceptors.request.use(config => {
  console.log(config)
  config.headers['token'] = uni.getStorageSync('token') || '' // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
service.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  console.log(openDefultParams)
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * 响应拦截
 */
service.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
   console.error('登录失败401')
  }
  return response
}, error => {
  return Promise.reject(error)
})

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
service.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
service.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

service.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : (process.env.NODE_ENV === 'development' ? 'http://localhost:8080/renren-fast' : 'https://lzebaba.club/renren-fast')) + actionName
}

export default service;