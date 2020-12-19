const router = require('express').Router()
const { ensureAuth } = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const Story = require('../models/Story')

router.post('/stories',(req,res)=>{
    try{
        const newStory = new Story({
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            user: req.body.user
        })
        newStory.save()
        res.redirect('/dashboard')
    }catch(err){
        console.log(err);
        res.render('500')
    }
    console.log()
})

router.get('/addStory',(req,res)=>{
    res.render('addStory')
})

module.exports = router