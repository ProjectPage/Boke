const { User,validateRule} = require('../../model/user');
const isLogin = require('../../isLogin');
module.exports = async (req,res,next)=>{
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }    
    try{
        //得验证传过来的参数是否符合规则
        var isTrue = await validateRule(req.body);
        // 首先判断有没有这个人
        var isFound = await User.findOne({_id:req.query.id});
        // 判断密码一致吗
        var isPassword = req.body.password === isFound.password;
        // 密码不应该改，所以要解构出来
        var {username,email,role,statu} = req.body;
    }catch(e){
        return res.render('admin/user-edit',{
            submit:'修改',
            message:e.message,
            displayBlock:'displayBlock',
            host:'/admin/modify?id=' + req.query.id,
            userinfo:req.session.userinfo,
            _id:req.query.id
        })
    }

    // 前面三者都满足
    if(isFound && isTrue && isPassword){
        await User.updateOne({_id:req.query.id},{username,email,role,statu});
        return res.redirect('/admin/user')
    }
    else{
        return res.render('admin/user-edit',{
            submit:'修改',
            message:e.message,
            displayBlock:'displayBlock',
            host:'/admin/modify?id=' + req.query.id,
            userinfo:req.session.userinfo,
            _id:req.query.id
        })
    }
}