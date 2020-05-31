module.exports = (req,res)=>{
    // if(req.query.home){
    //     return res.redirect('/home');
    // }
    return res.render('admin/login',{id:req.query.id,url:req.query.url})
}