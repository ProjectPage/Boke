const { form } = require('../../filemake/upfile');
const {Article,validateRule} = require('../../model/article');
const isLogin = require('../../isLogin');
module.exports = async (req,res,next)=>{
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }  
    form.parse(req,async (err,filed,files) => {
        var isTrue = await validateRule({
            title:filed.title,
            content:filed.content
        });
        if(isTrue){
            await Article.create({
                title:filed.title,
                author:req.session.userinfo._id,
                content:filed.content,
                cover:files.cover.path.split('plublic')[1],
                data:filed.date
            }).then(result =>{return res.redirect('/admin/article')}).catch(error=>console.log('添加失败',error));
            
        }
        else{
            return next(JSON.stringify({path:'/admin/article-edit',message:'输入不符合规则'}))
        }
        
    })
    
}