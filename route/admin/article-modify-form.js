const { form } = require('../../filemake/upfile');
const isLogin = require('../../isLogin');
const { Article,validateRule } = require('../../model/article');
module.exports = (req,res,next)=>{
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }  
    form.parse(req,async (err,filed,files)=>{
        var isTrue = await validateRule({
            title:filed.title,
            content:filed.content
        })
        if(isTrue){
            await Article.updateOne({_id:filed.id},{
                title:filed.title,
                content:filed.content,
                date:filed.date,
                cover:files.cover.path.split('plublic')[1]
            }).then(result => console.log('添加成功'),error => console.log(error));
            return res.redirect('/admin/article');
        }
        else{
            return next(JSON.stringify({path:'/admin/article-modify',message:'输入不符合规则'}))
        }
    })
    

}

// 现在要做的服务器更新数据库中的数据
// 1.修改信息
// 2.点击提交
// 3.服务器拿到数据
// 4.用设定好的规则进行排查
// 5.成功就更新数据库，并重定向到/admin/article
// 6.失败就走错误处理中间件,