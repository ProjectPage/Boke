const isLogin = require('../../isLogin');
module.exports = (req,res)=>{
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }  
    return res.render('admin/article-edit',{userinfo:req.session.userinfo,title:"发布文章"})
}
// 现在要做的是发布（也就是把文章存到数据库）
// 1.客户端表单输入信息，点击提交，触发post请求（都没有做客户端排查）
// 2.服务器拿到参数，将参数进行规则匹配
// 3.匹配成功，将信息纳入数据库，重定向到文章管理（/admin/article）

// 3.如果匹配不成功，触发错误处理中间件，重定向到添加文章页面(/admin/article-edit)


// 这次因为表单提交的有文件，在客户端已经通过处理转换成了二进制，所以要想拿到这个数据的借助第三方模块(formidable);它返回一个对象
// ，new 这个对象里的IncomingForm方法创建一个解析对象


// 现在做分页
// 1.调用第三方模块来处理(mongoose-sex-page)，它返回一个函数
// 2.使用这个方法来处理，这个方法返回需要的数据
// 3.将数据放到指定的地方