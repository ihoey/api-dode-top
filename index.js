const Koa = require('koa')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
// 创建 router 实例对象
const router = new KoaRouter()

const shellApi = require('./shellString/shellApi')
const { checkConfig, sendMessage } = require('./wechat/contact/sendMessage')

const { exec } = require('child_process')

//注册路由
router.get('/', async ctx => {
  console.log('index')
  ctx.body = 'welcome api.dode.top page~'
})

router.get('/home', async ctx => {
  console.log('home')
  let { error, stdout, stderr } = await exec(shellApi.juejinPost)
  if (error) console.log('error: ' + error)
  ctx.type = 'application/json;charset=utf-8'
  ctx.body = stdout || {}
})

router.get('/openDoor', async ctx => {
  console.log('openDoor')
  let { error, stdout, stderr } = await exec(shellApi.openDoor())
  if (error) console.log('error: ' + error)
  ctx.type = 'application/json;charset=utf-8'
  ctx.body = stdout || {}
})

router
  .get('/miniprogram/contact', async ctx => {
    console.log('/miniprogram/contact -- get')
    const body = await checkConfig(ctx)
    ctx.body = body
  })
  .post('/miniprogram/contact', async ctx => {
    console.log('/miniprogram/contact -- post')
    const body = await sendMessage(ctx)
    ctx.body = body
  })

app.use(bodyParser())
app.use(router.routes()) // 添加路由中间件
app.use(router.allowedMethods()) // 对请求进行一些限制处理

app.listen(3000, () => {
  console.log('route-use-middleware is starting at port 3000')
})
