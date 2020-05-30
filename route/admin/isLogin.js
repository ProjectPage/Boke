const { User} = require('../../model/user'); 
const isLogin = require('../../isLogin');
module.exports = async (req,res) => {
    if(isLogin(req.session.userinfo)){
        return res.redirect('/admin/login');
    }  
    // 确认当前显示的分页哪个被选中
    var selectPage = req.query.page || 1;
    // 拿到数据的总和
    var count = await User.countDocuments({});
    // 设置一个页面最多显示的信息条数
    var maxSize = 10;
    // 计算有几个分页器
    var fenyeSize = Math.ceil(count / maxSize);
    // 拿到查到的数据,并设置查询位置
    var user = await User.find().limit(maxSize).skip((selectPage - 1) * maxSize);
    // 设置标识，让服务器知道这是哪一个页面
    req.app.locals.requsetPage = "user";
    req.session.userinfo?res.render('admin/user',{username:req.session.userinfo.username,title:'用户界面',user,fenyeSize,selectPage,count}):res.redirect('/admin/login');
}