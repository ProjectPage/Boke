const {User} = require('../../model/user');
const isLogin = require('../../isLogin');
module.exports = async (req,res,next) => {
    var {email,password} = req.body;
    if(email.trim().length === 0 || password.trim().length === 0){
        return next(JSON.stringify({path:'admin/error',message:'邮箱或密码为空，请输入',title:'错误信息'}))
    }
    var getMongodbValue = await User.findOne({email,});
    if(!getMongodbValue || getMongodbValue.password !== password){
        return next(JSON.stringify({path:'admin/error',message:'输入的邮箱或密码错误，请确认输入',title:'错误信息'}))
    }
    else{
        //记录登陆状态
        req.session.userinfo = getMongodbValue;
        // 记录模板公用数据
        req.app.locals.userCookie = getMongodbValue;
        // 在文章页面点击登陆过来的
        if(req.body.url === 'home'){
            return res.redirect('/home');
        }
        // 从评论那调过来的，则需要带一个之前文章的id，所以判断有没有这个id就行了，如果有就走这个
        if(req.body.id !== ''){
            return res.redirect(`/home/article_details?id=${req.body.id}`);
        }
        else{        
            // 如果是管理用户/怎么判断是管理用户
            // 1.查到的数据里面有一个role，如果是admin就是管理反之就是普通
            if(getMongodbValue.role === 'admin'){
                // 管理用户
                return res.redirect('/admin/user')
            }
            if(getMongodbValue.role === 'normal'){
                // 普通用户
                return res.redirect('/home');
            }
        }

    }
}

// 还有一种登陆情况是，自己点击登陆
// 当然在哪点的就要回到哪里