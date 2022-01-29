const express = require("express");
const blogRouter = express.Router();
const {Blog} = require('../models/association');
const reqAuth = require('../middlewares/auth');
const { sync } = require("../models/user");
const req = require("express/lib/request");

// consists of dashboard routes
blogRouter.get("/dashboard", reqAuth, async(req, res) =>{
    try{
        var blogs = await Blog.findAll()
        res.render("dashboard",{blogs, userName: req.session.userName})
    }catch(err){
        res.status(400).json(err)
    }
});
blogRouter.get("/newBlog",reqAuth,(req, res)=>res.render("newBlog"))
blogRouter.get("/edit/:id",reqAuth,async(req, res)=>{
    var blog = await Blog.findAll({where: {id: req.params.id}})
        res.render("blogEdit",{blog})
})
// new blog handler
blogRouter.post("/newBlogForm",reqAuth, async(req, res) =>{
    try{
        const newBlog = await Blog.create(
            {
               title : req.body.title,
               content : req.body.content,
               userId: req.session.userId, 
            }
        )
        res.redirect('dashboard')
    }catch(err){
        res.status(200).json(err)
    }
})
blogRouter.post('/update/:id', reqAuth,  async (req, res) => {
    try {
        const updatedBlog = await Blog.update(
        {
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId,
        },
        {
            where: {
            id: req.params.id,
          }
        }
      );
      res.status(200).json(updatedBlog);
    } catch (err) {
      res.status(400).json(err);
    }
});

blogRouter.delete('del_blog/:id', reqAuth, async (req, res) => {
    try {
        const deleteBlog = await Blog.destroy({
        where: {
              id: req.params.id,
            }
        })
  
        if (!deleteBlog) {
            res.status(404).json({ message: 'No Blog found with this id!' });
            return;
        }
  
        res.status(200).json(deleteBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = blogRouter