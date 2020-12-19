module.exports = (req,res,next)=>{
    if (!req.user.admain){
        res.redirect('/dashboard')
    } else{
        next()
    }
}