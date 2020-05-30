const {User} = require('../../model/user');
const isLogin = require('../../isLogin');
module.exports = async (req,res,next)=>{
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }  
    var {hidden_value} = req.body;
    var isFound = await User.findOne({_id:hidden_value});
    if(isFound){
    await User.findOneAndDelete({_id:hidden_value});
    return res.redirect('/admin/user');
    }
    else{
        next({path:"/admin/user",message:'错误了'})
    }
}