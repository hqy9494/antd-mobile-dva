const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
//创建我们的用户Schema
const goodsSchema = new Schema({
    id:ObjectId,
    name:String,
    image:String,
    prize:Number,
    content: String,
})
//发布模型
mongoose.model('Goods',goodsSchema)