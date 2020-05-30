const {User,validateRule} = require('../../model/user');
const isLogin = require('../../isLogin');
module.exports = async (req,res,next)=>{
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }  
        // 拿到参数
    var query = req.body;
    // 对参数格式进行判断
    // 如果数据库中有这个用户（用邮箱来判断）
    // 得用到集合规则
    try{
        await validateRule(query);
    }catch(e){
        return next(JSON.stringify({path:'/admin/user-edit',message:e.message,displayBlock:'displayBlock'}))
    }
    var userInfo = await User.findOne({email:query.email});
    // 如果没问题，就添加用户
    if(userInfo !== null){
        return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱已被添加',displayBlock:'displayBlock'}))
    }
    else{
        User.create(query).then(result => console.log('添加成功')).catch(error => console.log('添加失败',error));
        return res.redirect('/admin/user');
    }
    // 如果有问题就重新定向到user-edit
}
// 1.拿到参数
// 2.对参数进行排查
// 3.如果格式没问题，就像数据库中添加用户
// 怎么对传过来的参数进行排查
// 有一个第三方模块叫Joi
// 首先得加载这个第三方模块，这个模块返回一个对象
// 然后定义一个排查规则，就是一个对象
// 最后在使用这个规则来排查
// 3.有问题，就返回格式错误，重新定向到uesr-edit页面
// 4.添加完成后重新定向到user页面
// 5.在user页面中更新数据