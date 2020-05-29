const { Article } = require('../../model/article');
const isLogin = require('../../isLogin');
module.exports = async (req,res)=>{
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }  
    var { id } = req.query;
    var Xinxi =  await Article.findOne({_id:id}).populate('author');
    return res.render('admin/article-modify',{
        id,
        Xinxi,
        title:'修改文章'
    });
}


// 现在要做修改功能模块
// 1.点击修改按钮
// 2.服务器拿到参数id进行排查，找到了就返回这个信息，并返回admin/modify模板,将数据填到模板中
