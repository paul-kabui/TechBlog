const express = require("express");
const homeRouter = express.Router();
const {Comment} = require('../models/association')
const {Blog} = require("../models/association")
const {User} = require('../models/association');
const { create } = require("../models/user");
const reqAuth = require("../middlewares/auth")

// home view
homeRouter.get("/",async(req, res)=>
    {
        try{
            var blogs = await Blog.findAll()
            console.log(blogs)
            res.render("home",{blogs})
        }catch(err){
            res.status(400).json(err);
        }
    });

// comment view
homeRouter.get("/:id",async (req, res)=>{
    try{
        var blog = await Blog.findByPk(parseInt(req.params.id));
        var blogWritter = await User.findByPk(blog.userId)
        var comments = await Comment.findAll({where: {blogId: parseInt(req.params.id)}});

        console.log(comments)
        req.session.save(() => {
        req.session.blogId = blog.id
        res.render("commentPage",{blog,comments, 'owner':blogWritter.username})
    });
    }catch (err) {
        res.status(400).json(err);
      }; 
});
homeRouter.post("/commentForm",reqAuth,async (req, res) =>{
    try{
        const readerComment =  await Comment.create({
            content : req.body.comment,
            username : req.session.userName,
            userId : req.session.userId,
            blogId : req.session.blogId
        })
        res.redirect('/')
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports = homeRouter;