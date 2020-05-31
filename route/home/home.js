const { Article } = require('../../model/article');
const page = require('mongoose-sex-page')
module.exports = async (req,res)=>{
    var show_page = req.query.page || 1;
    var articleContent = await page(Article).page(show_page).size(10).display().find().populate('author').exec();
    return res.render('home/home',{articleContent,title:'首页',userinfo:req.session.userinfo});
}