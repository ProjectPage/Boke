// 现在要做评论功能
// 因为要存储评论的数据，所以需要新建一个数据库
// 1.输入信息（现在不考虑过滤不良词汇）  
// 2.提交到服务器    
// 3.服务器处理，将数据放入数据库  没有数据库，所以先建一个
// 4.重定向到文章详情页面
const { Comment } = require('../../model/comment');
module.exports = async (req,res)=>{
    var { comment,aId,uId } = req.body;
    if(req.session.userinfo){
        await Comment.create({
            comment,
            aId,
            uId
        }).then(result => console.log('评论添加成功')).catch(error => console.log('失败了',error));
        return res.redirect(`/home/article_details?id=${aId}`);
    }
    else{
        return res.redirect(`/admin/login?id=${aId}`);
    }
    
    // if(req.session.userinfo){

    // }

}

// 如果想评论没登陆就会跳到登陆页面，并把这个文章的id传过去
// 1.判断有没有登陆
// 2.有救发送请求
// 3.没有就跳到登陆