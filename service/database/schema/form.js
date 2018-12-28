const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
//创建我们的用户Schema
const formSchema = new Schema({
    id:ObjectId,
    money1:Number,
    money2:Number,
    files:Array,
    control:String,
    startTime: String,
    endTime: String
})
//发布模型
mongoose.model('Form',formSchema)