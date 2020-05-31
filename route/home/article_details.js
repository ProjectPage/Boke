// 现在要做的是文章详情页面
// 1.点击首页的列表，传到服务器的参数是这个文章的ID   get方法传的参数   用req.query
// 2.服务器根据id在数据库中查找    article.findOne()
// 3.用数据渲染模板并返回    渲染模板，并返回 模板文件是article_details
const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports =async (req,res)=>{
    var {id} = req.query;
    var articleXinxi = await Article.findOne({_id:id}).populate('author');
    var commentXinxi = await Comment.find({aId:id}).populate('uId');
    console.log(commentXinxi);
    res.render('home/article_details',{articleXinxi,commentXinxi,title:articleXinxi.title,userinfo:req.session.userinfo});
}
// 现在完成评论的显示功能
// 1.从服务器拿到信息
// 2.将信息渲染到页面上