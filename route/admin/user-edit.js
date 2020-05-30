const isLogin = require('../../isLogin');
module.exports = (req,res)=>{
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }    
    var {message,displayBlock} = req.query;
    return res.render('admin/user-edit',{
        message,
        displayBlock,
        userinfo:req.session.userinfo.username,
        submit:'提交',
        host:'/admin/user-edit',
        title:'增加用户'
    });
}