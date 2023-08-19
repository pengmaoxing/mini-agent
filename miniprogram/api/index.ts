import {request} from '../utils/request';
console.log(request)
/**
 * @description 登录接口
 * @param {Object}  username 账号   password 密码
 */
export const login = (params:any)=> {
  return request({
    url:'/merchant/admin/login',
    data: params,
    method: 'POST'
  })
}