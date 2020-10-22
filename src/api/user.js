import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/api/v1/user/admin/user_list',
    method:'get',
    params:params
  })
}

// axios 中 params 发送的事 url 参数， data 传的事 json 参数
export function delUser(data) {
  return request({
    url:'/api/v1/user/admin/del_user',
    method:'post',
    data:data
  })
}


export function createUser(data) {
  return request({
    url:'/api/v1/user/admin/add_user',
    method:'post',
    data:data
  })
}


export function signAsAgent(data) {
  return request({
    url:'/api/v1/user/admin/upgrade_as_agent',
    method:'post',
    data:data
  })
}
