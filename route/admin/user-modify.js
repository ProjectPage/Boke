const { User } = require('../../model/user');
const isLogin = require('../../isLogin');
module.exports = async (req,res,next)=>{
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }  
    // 获得请求参数
    var {id} = req.query;
    // 查询数据库中指定的信息
    var result = await User.findOne({_id:id});
    // result.userinfo = req.session.userinfo;
    var {username,email,role,statu,_id} = result;
    if(result){
        return res.render('admin/user-edit',{
            username,
            email,
            role,
            statu,
            _id,
            userinfo:req.session.userinfo.username,
            submit:'修改',
            host:'/admin/user-modify?id='+id,
            title:'修改用户'
        })
    }
    else{
        return next(JSON.stringify({
            path:'/admin/user-edit',
            message:"用户不存在，请确认输入",
        }));
    }
}

// 修改用户的功能
// 添加路由处理中间件/admin/user-mondify;
// 首先把模板文件的内容做完整
// 1.点击修改图标、
// 2.把ID发送到服务器
// 3.服务器根据这个ID查询数据库中这个ID的信息，返回这个Id的信息，
// 4.服务器返回信息后，把信息解构到修改界面的表单里面
// 5.编辑信息
// 6.点击提交（这客户端没有做验证）
// 7.将信息提交到服务器，
// 8.服务器处理，
// 9.服务器验证。验证成功更新信息并重定向到user，不成功返回输入的信息有误
