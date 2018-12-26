const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
//创建我们的用户Schema
const advSchema = new Schema({
    id:ObjectId,
    img:String,
    title:String,
    des: String,
})
//发布模型
mongoose.model('Adv',advSchema)