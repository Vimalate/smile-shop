const mongoose = require('mongoose')
const db = 'mongodb://localhost/smile-db'
const glob=require('glob')
// 相对路径转换为绝对路径
const {resolve} =require('path')
exports.initSchema=()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}
exports.connect = () => {
    // 连接数据库
    mongoose.connect(db)
    let maxConnect=0
    // 数据监听事件
    return new Promise((resolve, reject) => {
        mongoose.connection.on('disconnected', () => {
            console.log('数据库断开，正在尝试重连')
            if(maxConnect<=3){
                maxConnect++
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库出现问题')
            }
        })
        mongoose.connection.on('error', (err) => {
            console.log('数据库错误，正在尝试重连')
            if(maxConnect<=3){
                maxConnect++
                mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('数据库出现问题')
            }
        })
        mongoose.connection.once('open', () => {
            console.log('数据库连接成功')
            resolve()
        })
    })

}