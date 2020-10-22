import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: 'api/v1/user/logout',
    method: 'post'
  })
}
