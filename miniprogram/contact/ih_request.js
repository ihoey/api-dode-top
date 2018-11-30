/*
 * @Author: ihoey
 * @Date: 2018-11-29 19:15:40
 * @Last Modified by: ihoey
 * @Last Modified time: 2018-11-29 19:19:42
 */
// ih_request.js

const request = require('request')
const ih_request = {}
module.exports = ih_request
ih_request.get = async (option) => {
  const res = await request({
    url: option.url,
    method: 'get'
  })
  res.result ? option.success(res.msg) : option.error(res.msg)
}
