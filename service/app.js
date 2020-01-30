const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')

const {
    connect,initSchema
} = require('./database/index')

;
(async () => {
    await connect()
    initSchema()
    const User=mongoose.model('User')
    let oneUser=new User({userName:'liujian',password:'123456'})
    oneUser.save().then(()=>{
        console.log('插入成功')
    })
    let user=await User.findOne({})
    console.log(user)
})()

app.use(async (ctx) => {
    ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000, () => {
    console.log('runing')
})