/*
 * @Author: ihoey
 * @Date: 2018-11-29 19:15:40
 * @Last Modified by: ihoey
 * @Last Modified time: 2018-11-30 19:48:36
 */
// wx_sendMessage.js
const crypto = require('crypto')
const EncodingAESKey = 'faHQB2LH1nJtLZwXOF2xZJyhYoUkR9AiqpFdvIr5300'
// const request = require('./ih_request')
const request = require('request')

//这个access_token需要自己维护
const access_token = 'K5ibmNsq4EPHngbLYgh3H5JEv2waBzQHeYqyiEBjzLJ'

checkConfig = () => {
  const checkResult = checkSignature({
    'signature': ctx.query.signature,
    'echostr': ctx.query.echostr,
    'timestamp': ctx.query.timestamp,
    'nonce': ctx.query.nonce
  })
  return checkResult ? checkResult : 'err signature'
}

sendMessage = async (ctx) => {
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
  return ctx.request.body
}

const checkSignature = (q) => {
  const signature = q.signature
  const echostr = q.echostr
  const token = 'ihoey'
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

sendTextMessage = async (content, data, access_token) => {
  const requstData = {
    touser: data.FromUserName,
    msgtype: "text",
    text: {
      content: content
    }
  }
  await request.post({
    url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' + access_token,
    body: JSON.stringify(requstData),
    success: (res) => {
      console.log(res)
    },
    error: (err) => {
      console.log(err)
    }
  })
}

sendImageMessage = async (media_id, data, access_token) => {
  const requstData = {
    touser: data.FromUserName,
    msgtype: "image",
    image: {
      media_id: media_id
    }
  }
  await request.post({
    url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' + access_token,
    body: requstData,
    success: (res) => {
      console.log(res)
    },
    error: (err) => {
      console.log(err)
    }
  })
}

module.exports = {
  sendMessage,
  checkConfig
}
