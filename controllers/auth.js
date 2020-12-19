const router = require('express').Router()
const passport = require('passport')

router.get('/google',passport.authenticate('google', { scope: ['profile']}))

router.get('/google/callback',passport.authenticate('google',{failureRedirect: '/'}),(req,res)=>{
    res.redirect('/stories')
})

// desc logout if current user
// route /logout
router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')

})
module.exports = router