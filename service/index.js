const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
let goods = require('./appApi/goods.js')
let adv = require('./appApi/adv.js')
const cors = require('koa2-cors')
app.use(cors())
let router = new Router();
app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParser());
router.use('/goods',goods.routes())
router.use('/adv',adv.routes())
//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
    const Adv = mongoose.model('Adv')
    // const Goods = mongoose.model('Goods')
    // let oneGoods = new Goods({name:'jspang13',prize:'30',image:'www.qq.com',content:'www.aa.com'})
    // let oneAdvs = new Adv({img:'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',title:'30',des:'www.qq.com'})
    // oneGoods.save().then(()=>{
    //     console.log('Goods插入成功')
    // })
    // oneAdvs.save().then(()=>{
    //     console.log('Advs插入成功')
    // })
// let  users = await  Good.findOne({}).exec()
// console.log('------------------')
// console.log(users)
// console.log('------------------')  
})()

app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})