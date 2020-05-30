var isLogin = req => {
    return typeof req !== 'undefined'?false:true;
}
module.exports = isLogin;