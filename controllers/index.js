const router = require('express').Router()
const { ensureAuth,ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')

// desc main page where login in is immediately prompted
// route /
router.get('/',ensureGuest,(req,res)=>{
    res.render('home')
})

// desc dashboard route
// router /dashboard
router.get('/dashboard',ensureAuth, async (req,res)=>{
    try{
        const stories = await Story.find({ user : req.user.id }).lean()
        res.render('dashboard',{ stories })
    }catch(err){
        console.log(err);
        res.render('500')
    }
})

// desc public stories page
// route /stories
router.get('/stories', async (req,res)=>{
    const stories = await Story.find({status: 'public'})
        .populate('user')
        .sort({createdAt: 'desc'})
        .lean()
    console.log(stories)
    res.render('stories',{ stories })
})

router.get('/:id', async (req,res)=>{
    const story = await Story.findOne({ _id:req.params.id })
    res.render('singleStory',{ story })
})

router.post('/likeStory', async (req,res)=>{
    let story = await Story.findOne({_id:req.body.story_id})
    story.likes++
    story.save()
    res.redirect(`/${req.body.story_id}`)
})

// desc logout if current user
// route /logout
router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')

})

module.exports = router