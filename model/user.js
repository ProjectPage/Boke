//加载验证请求参数第三方模块
const Joi = require('joi');
const mongoose = require('mongoose');
//创建用户集合规则
const userSchema =  new mongoose.Schema({
     username:{
         type:String,
         required:true,
     },
     email:{
         type:String,
         required:true,
         unique:true
     },
     password:{
         type:String,
         required:true,
         minlength:8,
         maxlength:14
     }
     ,
     role:{
         type:String,
         enum:['admin','normal'],
         required:true
     },
     statu:{
         type:Number,
         default:0
     }
 })
//  对某个集合使用规则
const User = mongoose.model('User',userSchema);
// 设置验证请求参数规则
const validateRule = user => {
    const schema = {
    username:Joi.string().min(2).max(10).required().error(new Error('用户名不符合规则')),
    email:Joi.string().email().required().error(new Error('邮箱格式不符合规则')),
    password:Joi.string().regex(/^[a-zA-Z0-9]{8,20}$/).error(new Error('密码不符合规则')),
    role:Joi.string().valid('normal','admin').error(new Error('权限不符合规则')),
    statu:Joi.number().valid(0,1).error(new Error('状态码不符合规则'))
}
// 对参数进行排查
return Joi.validate(user,schema);
}



module.exports = {
    User,
    validateRule
};