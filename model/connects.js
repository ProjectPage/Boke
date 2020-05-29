//连接数据库

//引用mongoose框架
const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/projectJs',{ useUnifiedTopology: true ,useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch((e) => console.log('数据库连接失败',e));
