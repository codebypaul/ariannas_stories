const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Story = require('../models/Story')

router.use(express.static('public'))

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
    try{
        res.render('addstory')
    }catch (err) {
        console.log(err);
        res.render('500')
    }
})


module.exports = router