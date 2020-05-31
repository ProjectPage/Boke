module.exports = (req,res)=>{
    req.session.destroy(function(){
        res.clearCookie('connect.sid');
        if(req.query.is === '1'){
            return res.redirect('/admin/login');
        }
        return res.redirect('/home');
    })
}

// 现在要做退出登录
// 何为退出登录
// 就是清楚服务器保存的session和cookie
// 那怎么清除
// 先清除session，清除成功调用函数，在函数里清楚cookie