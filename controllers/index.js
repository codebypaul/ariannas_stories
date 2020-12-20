const express = require('express')
const router = express.Router()
const { ensureAuth,ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')
const isAdmin = require('../middleware/isAdmin')

router.use(express.static('public'))

// desc main page where login in is immediately prompted
// route /
router.get('/',ensureGuest,(req,res)=>{
    res.render('home')
})

// desc dashboard route
// router /dashboard
router.get('/dashboard',ensureAuth, async (req,res)=>{
    try{
        if (req.user.admin){
            const stories = await Story.find({ user : req.user.id }).lean()
            res.render('dashboard',{ stories })
        } else {
            res.redirect('/stories')
        }
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
    res.render('stories',{ stories })
})

//
//
router.get('/:id', async (req,res)=>{
    const story = await Story.findOne({ _id:req.params.id })
    res.render('singleStory',{ story })
})

//
//
router.get('/test',(req,res)=>{
    try{
        res.send('test message')
    } catch (err) {
        console.log(err);
    }
})

module.exports = router