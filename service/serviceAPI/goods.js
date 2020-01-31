const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')
router.get('/GoodsInfo', async (ctx) => {
    fs.readFile('./newGoods.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let i = 0
        const Goods = mongoose.model('Goods')
        data.map((val, index) => {
            console.log(val)
            let newGoods = new Goods(val)
            newGoods.save().then(() => {
                i++
                console.log('success!' + i)
            }).catch(err => {
                console.log(err)
            })
        })
    })
    ctx.body = '数据导入数据！'
})
router.get('/category', async (ctx) => {
    fs.readFile('./datajson/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        const Category = mongoose.model('Category')
        data.RECORDS.map((val, index) => {
            console.log(val)
            let i = 0
            let newCategory = new Category(val)
            newCategory.save().then(() => {
                i++
                console.log('success!' + i)
            }).catch(err => {
                console.log(err)
            })

        })

    })
    ctx.body = '开始导入数据！'
})
router.get('/categorySub', async (ctx) => {
    fs.readFile('./datajson/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((val, index) => {
            console.log(val)
            let i = 0
            let newCategorySub = new CategorySub(val)
            newCategorySub.save().then(() => {
                i++
                console.log('success!' + i)
            }).catch(err => {
                console.log(err)
            })

        })

    })
    ctx.body = '开始导入数据！'
})
router.post('/getDetailGoodsInfo', async (ctx) => {
    try {
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        let rsult = await Goods.findOne({
            ID: goodsId
        }).exec()
        ctx.body = {
            code: 200,
            message: result
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }

    //    .then(async(result)=>{
    //        
    //     }).catch(err=>{
    //         console.log(err)
    //         ctx.body={code:500,message:err}
    //     })
})
// 读取大类数据
router.get('/getCategoryList',async(ctx)=>{
    try{
        const Category=mongoose.model('Category')
        let result=await Category.find().exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
// 读取分类数据
router.get('/getCategorySubList',async(ctx)=>{
    try{
        // let categoryId=ctx.request.body.categoryId
        const CategorySub=mongoose.model('CategorySub')
        let result=await CategorySub.find({}).exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
module.exports = router