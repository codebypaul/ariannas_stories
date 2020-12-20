module.exports = (req,res,next)=>{
    if (!req.user.admin){
        res.redirect('/dashboard')
    } else{
        next()
    }
}