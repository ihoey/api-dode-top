/*
 * @Author: ihoey
 * @Date: 2018-11-29 19:15:40
 * @Last Modified by: ihoey
 * @Last Modified time: 2018-12-01 13:03:56
 */
// wx_sendMessage.js
const crypto = require('crypto'),
  util = require('util'),
  axios = require('axios'),
  config = require('../config')
const { getAccessToken } = require('../auth/accessToken')

// 配置
const checkConfig = () => {
  const checkResult = checkSignature({
    'signature': ctx.query.signature,
    'echostr': ctx.query.echostr,
    'timestamp': ctx.query.timestamp,
    'nonce': ctx.query.nonce
  })
  return checkResult ? checkResult : 'err signature'
}

const checkSignature = (q) => {
  const signature = q.signature
  const echostr = q.echostr
  const token = config.token
  const timestamp = q.timestamp
  const nonce = q.nonce

  const array = new Array(token, timestamp, nonce)
  array.sort()
  const str = array.toString().replace(/,/g, "")
  const sha1Code = crypto.createHash("sha1")
  const code = sha1Code.update(str, 'utf-8').digest("hex")

  if (code === signature) {
    return echostr
  } else {
    return 'error'
  }
}

// 发送消息
const sendMessage = async (ctx) => {
  const access_token = await getAccessToken()
  const data = ctx.request.body
  switch (data.MsgType) {
    case 'text':
      { //用户在客服会话中发送文本消息
        await sendTextMessage("我知道了", data, access_token)
        break
      }
    case 'image':
      { //用户在客服会话中发送图片消息
        await sendImageMessage(data.MediaId, data, access_token)
        break
      }
    case 'event':
      {
        if (data.Event == 'user_enter_tempsession') { //用户在小程序“客服会话按钮”进入客服会话,在聊天框进入不会有此事件
          await sendTextMessage("您有什么问题吗?", data, access_token)
        } else if (data.Event == 'kf_create_session') { //网页客服进入回话
          console.log('网页客服进入回话')
        }
        break
      }
  }
  return 'success'
}

// 文字类消息
const sendTextMessage = async (content, option, access_token) => {
  const data = {
    touser: option.FromUserName,
    msgtype: "text",
    text: {
      content: content
    }
  }

  const url = util.format(config.apiURL.sendMessageApi, config.apiDomain, access_token)
  const res = await axios.post(url, data)
  console.log('option-res', res)
}

// 图片类消息
const sendImageMessage = async (media_id, option, access_token) => {
  const data = {
    touser: option.FromUserName,
    msgtype: "image",
    image: {
      media_id: media_id
    }
  }

  const url = util.format(config.apiURL.sendMessageApi, config.apiDomain, access_token)
  const res = await axios.post(url, data)
  console.log('option-res', res)
}

module.exports = {
  sendMessage,
  checkConfig
}
