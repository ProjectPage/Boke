//引用express框架
const express = require('express');

//创建博客展示页面路由
const home = express.Router();

//返回数据
home.get('/',require('./home/home'));
home.get('/article_details',require('./home/article_details'));
home.post('/article_comment',require('./home/article_comment'));

module.exports = home


// 现在要做的就是首页功能
// 1.配置路由   /home > 
// 2.配置路由处理函数  拿到数据库中的文章信息，并把信息返回到客户端  调用集合处理函数
// 3.形成静态页面   先分析这个页面有什么特别的地方，还有有哪些元素是公用的，公用的呢就放在骨架模板
// 4.拿到数据渲染模板
