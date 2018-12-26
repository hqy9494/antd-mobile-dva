const Router = require ('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
router.get('/register',async(ctx)=>{
    ctx.body="用户注册接口"
}) 

router.post('/add',async(ctx)=>{
    //取得Model
    const Products = mongoose.model('Goods')
    //把从前端接收的POST数据封装成一个新的user对象
    let newGoods = new Products(ctx.request.body)
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newGoods.save().then(()=>{
        //成功返回code=200，并返回成功信息
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
         //失败返回code=500，并返回错误信息
        ctx.body={
            code:500,
            message:error
        }
    })
})

router.get('/find',async(ctx)=>{
    //取得Model
    const Products = mongoose.model('Goods')
    //把从前端接收的POST数据封装成一个新的user对象
    // let newGoods = new Products(ctx.request.body)
    // console.log(Products)
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await Products.find({}).then((v)=>{
        console.log('v',v)
        //成功返回code=200，并返回成功信息
        ctx.response.body={
            code:200,
            data: v
        }
        // console.log(ctx.response.body)
    }).catch(error=>{
         //失败返回code=500，并返回错误信息
        ctx.body={
            code:500,
            message:error
        }
        // console.log('error',error)
    })
})


module.exports=router;