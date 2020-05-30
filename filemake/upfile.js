const formidable = require('formidable');
const path = require('path');
// 创建解析对象
const form = new formidable.IncomingForm();
//设置上传的位置
form.uploadDir = path.join(__dirname,'../','plublic','uploads');
// 设置又不要后缀名
form.keepExtensions = true;
module.exports = {
    form,
}