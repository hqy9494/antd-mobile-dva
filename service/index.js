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
app.use(bodyParser());
let router = new Router();
app.use(router.routes())
app.use(router.allowedMethods())
router.use('/goods',goods.routes())
router.use('/adv',adv.routes())
//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
    // const Adv = mongoose.model('Adv')
    const Form = mongoose.model('Form')

    // const Goods = mongoose.model('Goods')
    // let oneGoods = new Goods({name:'jspang13',prize:'30',image:'www.qq.com',content:'www.aa.com'})
    let oneForm = new Form({
        money1:1231,
        money2:33333,
        control: "6666666",
        files: [{
        url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
        id: '2121',
      }, {
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '2122',
      }],
      startTime: '2018-05-25 15:55:55',
      endTime: '2018-05-28 15:55:55'
    })
    // let oneAdvs = new Adv({img:'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',title:'30',des:'www.qq.com'})
    // oneForm.save().then(()=>{
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