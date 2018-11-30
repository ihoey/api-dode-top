const str = [1541164487, 1541425169, 1541503182, 1541761827]

const openDoor = () => {

  str.shift()
  str.push(Number(new Date()
    .getTime()
    .toString()
    .slice(0, 10)))

  // return `curl 'https://www.iotp.cn/wechat/index.php?r=Weweb/OpenDoor&longitude=0&latitude=0' -H '585fff5qj8054; Hm_lvt_471d72b09c2b64a6cd6b06038a8c8e50=${str.toString()}; Hm_lpvt_471d72b09c2b64a6cd6b06038a8c8e50=${str[3]}' -H 'Origin: https://www.iotp.cn' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: zh-CN,zh;q=0.9' -H 'User-Agent: mozilla/5.0 (linux; u; android 4.1.2; zh-cn; mi-one plus build/jzo54k) applewebkit/534.30 (khtml, like gecko) version/4.0 mobile safari/534.30 micromessenger/5.0.1.352' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Referer: https://www.iotp.cn/wechat/index.php?r=Weweb/MyKey' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' --data 'kid=102&opentype=3' --compressed`
  return `curl 'https://www.iotp.cn/wechat/index.php?r=Weweb/OpenDoor&longitude=0&latitude=0' -H 'Cookie: PHPSESSID=oa80pko8d61t2585fff5qj8054; Hm_lvt_471d72b09c2b64a6cd6b06038a8c8e50=1541164487,1541425169,1541503182,1541761827; Hm_lpvt_471d72b09c2b64a6cd6b06038a8c8e50=1541762659' -H 'Origin: https://www.iotp.cn' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: zh-CN,zh;q=0.9' -H 'User-Agent: mozilla/5.0 (linux; u; android 4.1.2; zh-cn; mi-one plus build/jzo54k) applewebkit/534.30 (khtml, like gecko) version/4.0 mobile safari/534.30 micromessenger/5.0.1.352' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Referer: https://www.iotp.cn/wechat/index.php?r=Weweb/MyKey' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' --data 'kid=102&opentype=3' --compressed`
}

const juejinPost = `curl 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_ids?src=web&uid=589c6f59128fe10058085039&device_id=1541476144140&token=eyJhY2Nlc3NfdG9rZW4iOiJ5ek1wYUtVZ21DQWp2azkxIiwicmVmcmVzaF90b2tlbiI6IlNIQkdWWGRRVE1rRzY4U1ciLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&entryIds=5b13c0c1518825137478917c' -H 'Origin: https://juejin.im' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: zh-CN,zh;q=0.9' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36' -H 'Accept: */*' -H 'Referer: https://juejin.im/entry/5b13c0c1518825137478917c' -H 'Connection: keep-alive' --compressed`

module.exports = {
  openDoor,
  juejinPost
}
