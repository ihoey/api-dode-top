const util = require('util'),
  fs = require('fs'),
  axios = require('axios'),
  accessTokenJson = require('../access_token'),
  config = require('../config')

const getAccessToken = async () => {
  //获取当前时间
  const currentTime = new Date().getTime()
  //格式化请求地址
  const url = util.format(config.apiURL.accessTokenApi, config.apiDomain, config.appID, config.appScrect)
  //判断 本地存储的 access_token 是否有效
  if (accessTokenJson.access_token === "" || accessTokenJson.expires_time < currentTime) {
    const { data } = await axios.get(url)

    if (data.access_token) {
      accessTokenJson.access_token = data.access_token
      accessTokenJson.expires_time = new Date().getTime() + (parseInt(data.expires_in) - 200) * 1000
      //更新本地存储的
      fs.writeFile(`${process.env.PWD}/wechat/access_token.json`, JSON.stringify(accessTokenJson), (err) => {
        if (!err) console.log('文件已更新')
        else console.log(err)
      })
      //将获取后的 access_token 返回
      return accessTokenJson.access_token
    } else {
      console.log('err', data)
      return data
    }
  } else {
    return accessTokenJson.access_token
  }
}

module.exports = {
  getAccessToken
}
