const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Story = require('../models/Story')

router.use(express.static('public'))

// desc Post new story
// route POST /stories
router.post('/',(req,res)=>{
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

// desc Update Story
// route PUT /stories/:id
router.put('/edit', async (req,res)=>{
    try{
        const story = await Story.findOne({_id:req.body.story_id})
        story.title = req.body.title
        story.status = req.body.status
        story.body = req.body.body
        story.save()
        res.redirect('/dashboard')
    }catch(err){
        console.log(err);
        res.render('500')
    }
})
// desc render story edit form
// route /stories/edit/:id
router.get('/edit:id',async (req,res)=>{
    const story = await Story.findOne({_id:req.params.id})
    res.render('editStory',{story})
})

// desc Display create story form
// router GET /stories/addStory
router.get('/addStory',ensureAuth,(req,res)=>{
    try{
        res.render('addStory')
    }catch (err) {
        console.log(err);
        res.render('500')
    }
})

// desc Add a like to a post with put request
// route PUT /stories/likeStory
router.post('/likeStory', async (req,res)=>{
    let story = await Story.findOne({_id:req.body.story_id})
    story.likes++
    story.save()
    res.redirect(`/${req.body.story_id}`)
})

// 
// 
router.delete('/delete', async (req,res)=>{
    try{
        console.log(req.body);
        const story = await Story.findOneAndDelete({_id:req.body.story_id})
        res.redirect('/dashboard')
    }catch(err){
        console.log(err);
    }
})
module.exports = router