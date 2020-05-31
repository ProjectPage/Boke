//连接数据库

//引用mongoose框架
const mongoose = require('mongoose');
// 引用config第三方模块
const config = require('config');
//连接数据库
mongoose.connect(`mongodb://${config.get("db.user")}:${config.get("db.password")}@${config.get("db.host")}/${config.get("db.name")}`,{ useUnifiedTopology: true ,useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch((e) => console.log('数据库连接失败',e));
