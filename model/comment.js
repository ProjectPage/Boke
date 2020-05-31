const mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    uId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    aId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article',
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
var Comment = mongoose.model('Comment',commentSchema);
module.exports = {
    Comment,
}


// 数据库里存了社么信息呢
// 1.评论内容
// 2.评论人的信息
// 3.评论的哪条文章