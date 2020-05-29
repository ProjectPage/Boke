const mongoose = require('mongoose');
const { User } = require('./user');
const Joi = require('joi');
var ArticleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:20,
        minlength:3,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    cover:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    },
    content:{
        type:String,
        required:true,
        minlength:10,
    }
})
var Article = mongoose.model('Article',ArticleSchema);
var validateRule = (p)=>{
    var Schema = {
        title:Joi.string().min(5).max(20).required().error(new Error('标题不符合规范')),
        content:Joi.string().min(10).required().error(new Error("正文不能少于100个字")),
    }
    return Joi.validate(p,Schema);
}

module.exports = {
    Article,
    validateRule,
}