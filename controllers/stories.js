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

router.get('/addStory',ensureAuth,(req,res)=>{
    try{
        res.render('addStory')
    }catch (err) {
        console.log(err);
        res.render('500')
    }
})

router.post('/likeStory', async (req,res)=>{
    let story = await Story.findOne({_id:req.body.story_id})
    story.likes++
    story.save()
    res.redirect(`/${req.body.story_id}`)
})


module.exports = router