const { Article } = require('../../model/article');
const isLogin = require('../../isLogin');
module.exports = async (req,res)=>{
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }  
    var id = req.body.hidden_value;
    var isFound = await Article.findOne({_id:id});
    if(isFound){
        await Article.findOneAndDelete({_id:id});
        return res.redirect('/admin/article');
    }
    else{
        return next(JSON.stringify({path:'/admin/article',message:'这个用户不存在'}))
    }
}
// 删除文章功能
// 1.点击删除
// 2.将要删除的标识字段传过去
// 3.服务器拿到标识字段进行匹配，
// 4.找到了就删了病重定向到/admin/article，没找到就错误处理