//引用express框架
const express = require('express');
//引用路径框架
const path = require('path');
// 加载body-parser模块来解析post方法的参数
const bodyParser = require('body-parser');
// 加载express-session第三方模块来处理登陆状态
const session = require('express-session');

//加载第三方模块morgan
const morgan = require('morgan');

//创建网站服务器
const app = express();
// 设置使用哪一种解析方法
app.use(bodyParser.urlencoded({extended:false}));
//开放静态资源
app.use(express.static(path.join(__dirname,'plublic')));
// 配置session
app.use(session({
    secret:"secret key",
    saveUninitialized:false,
    cookie:{
        maxAge:24*60*60*1000
    }
}));

// 获得当前电脑里的系统环境变量
console.log(process.env.NODE_ENV);
// 拦截请求，用Morgan模块拿到参数
// app.use(morgan('dev'));
//数据处理
require('./model/connects')
require('./model/user');
require('./model/article');
require('./model/comment');

//设置默认的模板位置
app.set('views',path.join(__dirname,'views'));
////告诉express模板的后缀是什么
app.set('view engine','art')
//告诉express使用什么模板引擎
app.engine('art',require('express-art-template'));
// 引入art-template,来设置共有的方法
const template = require('art-template');
// 加载第三方模块dateformat来处理日期格式
const dateformat = require('dateformat');
// 设置共有的方法
template.defaults.imports.dateformat = dateformat;
// 引入路由
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求，根据url返回指定的路由
app.use('/home',home);
app.use('/admin',admin);

// 登陆界面错误处理中间件
app.use('/admin/login',(err,req,res,next)=>{
    var xinxi = JSON.parse(err);
    return res.status(400).render(xinxi.path,{message:xinxi.message,title:xinxi.title});
})

// 添加用户界面错误处理中间件
app.use((err,req,res,next)=>{
    console.log(err);
    var xinxi = JSON.parse(err);
    var array = [];
    for(let i in xinxi){
        i !== 'path'?array.push(i + '=' +  xinxi[i]):''
    }
    return res.redirect(`${xinxi.path}?${array.join('&')}`);
})


//监听端口；浏览器默认监听80端口
app.listen(3000,(req,res) => {
    console.log(`网站服务器启动成功，请访问localhost:3000`);
});
