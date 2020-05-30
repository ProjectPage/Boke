const {Article} = require('../../model/article');
const isLogin = require('../../isLogin');
const mongoose_sex_page = require('mongoose-sex-page');
module.exports = async (req,res)=>{
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }  
    var  page  = req.query.page || 1; 
    var article = await mongoose_sex_page(Article).page(page).size(10).display().find().populate('author').exec();
    return res.render('admin/article',{
        article,
        userinfo:req.session.userinfo,
        title:'文章管理'
    })
}
// 1.拿到数据库中所有的信息
// 2.将信息放到模板中