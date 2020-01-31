const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const bodyParser=require('koa-bodyparser')
const cors=require('koa2-cors')
const { connect,initSchema } = require('./database/index')
const Router=require('koa-router')
let user=require('./serviceAPI/user')

app.use(bodyParser())
app.use(cors())

// 装载所有子路由
let router =new Router()
router.use('/user',user.routes())
// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
    await connect()
    initSchema()
    // const User=mongoose.model('User')
    // let oneUser=new User({userName:'liujian',password:'123456'})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })
    // let user=await User.findOne({})
    // console.log(user)
})()

app.use(async (ctx) => {
    ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000, () => {
    console.log('runing')
})