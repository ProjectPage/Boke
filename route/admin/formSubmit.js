const {User} = require('../../model/user');
const isLogin = require('../../isLogin');
module.exports = async (req,res,next) => {
    var {email,password} = req.body;
    if(email.trim().length === 0 || password.trim().length === 0){
        return next(JSON.stringify({path:'admin/error',message:'邮箱或密码为空，请输入',title:'错误信息'}))
    }
    var getMongodbValue = await User.findOne({email});
    if(!getMongodbValue || getMongodbValue.password !== password){
        return next(JSON.stringify({path:'admin/error',message:'输入的邮箱或密码错误，请确认输入',title:'错误信息'}))
    }
    else{
        req.session.userinfo = getMongodbValue;
        req.app.locals.userCookie = getMongodbValue;
        res.redirect('/admin/user')
    }
}