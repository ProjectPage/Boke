//引用express框架
const express = require('express');

//创建博客展示页面路由
const home = express.Router();

//返回数据
home.get('/',(req,res) => {
    res.send('欢迎来到博客展示页面')
})

module.exports = home