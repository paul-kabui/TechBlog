const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const {user} = require('../models/association');
userRouter.get("/signup", (req,res)=>res.render('signup')); //signup page
userRouter.get("/signin",(req, res) => res.render('signin')); //login page

userRouter.post('/register', async(req, res) =>{
    try {
        const userInfo = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.userId = userInfo.id;
            req.session.userName = userInfo.username;
            req.session.isLoggedIn = true;
        
            res.redirect('/') // if success then redirect to home
        }); // if success then redirect to home
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

userRouter.post('/login', async (req, res)=>{
    try {
        const userInfo = await User.findOne({ where: { email: req.body.email } });
        console.log(userInfo)
        const validPassword =userInfo.validatePassword(req.body.password); //returns true or false
        if(!userInfo && !validPassword) {
            res.status(400).json({ message: "Incorrect email or password, please try again" });
            return;
        };
        req.session.save(() => {
        req.session.userId = userInfo.id;
        req.session.userName = userInfo.username;
        req.session.isLoggedIn = true;
    
        res.redirect('/') // if success then redirect to home
      });
    } catch (err) {
      console.login(err)
    };
});

userRouter.post("/logout", (req, res) => {
    if (req.session.isLoggedIn) {
        req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

userRouter.get('/info',(req, res)=>{
    res.status(200).json(req.session.isLoggedIn)
})
  
module.exports = userRouter