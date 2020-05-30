//引用express框架
const express = require('express');

//创建博客管理页面路由
const admin = express.Router();


//拦截请求，如果不是已经登陆的状态就返回登陆界面，是登陆的就返回用户界面
admin.get('/user',require('./admin/isLogin'))
// defaullt路由
admin.get('/default',(req,res) => {
    res.render('admin/default')
})
// 登陆界面路由
admin.get('/login',require('./admin/loginPage'));
// 登陆界面表单提交路由
admin.post('/login',require('./admin/formSubmit'));
// 新增用户路由
admin.get('/user-edit',require('./admin/user-edit'));
// 新增数据库用户
admin.post('/user-edit',require('./admin/user-edit-mongodb'));
// 修改用户信息
admin.get('/user-modify',require('./admin/user-modify'));
// 提交修改用户信息
admin.post('/user-modify',require('./admin/user-modify-form'));
// 删除用户路由
admin.post('/user-delete',require('./admin/user-delete'));
// 文章管理路由
admin.get('/article',require("./admin/article"));
// 文章添加路由
admin.get('/article-edit',require('./admin/article-edit'));
admin.post('/article-edit',require('./admin/article-edit-form'));
// 文章编辑路由
admin.get('/article-modify',require('./admin/article-modify'));
admin.post('/article-modify',require('./admin/article-modify-form'));
// 文章删除路由
admin.post('/article-delete',require('./admin/article-delete-form'))

module.exports = admin