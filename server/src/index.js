import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

//Set up
const app = express();

app.listen(3000, ()=>{
  console.log("App listening on port 3000!");
});

main().catch(err => console.log(err));

async function main(){
  await mongoose.connect(process.env.MONGODB_URI)
}

import jwt from 'jsonwebtoken'
function generateAccessToken(username){
  return jwt.sign(username, process.env.TOKEN_SECRET, {expiresIn}); 
}

app.use(express.json());
//Routes

import authorRouter from '../routes/author.js'
app.use('/author', authorRouter);

//Login
import session from 'express-session';
import passport from 'passport';
import User from '../models/user.js';
const LocalStrategy = require('passport-local').LocalStrategy;

app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async(password, done)=>{
    try{
      const user = await User.find({username: "author"});
      if(user.password !== password)
        return done(null, false, {message: "Incorrect password"});
      return done(null, user);
    }catch(err){
      return done(err);
    };
  })
)

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
  passport.authenticate("local", {
    failureMessage: "Wrong password"
  }), (req,res)=>{
    res.redirect('/author');
  }
})

app.post('/login', (req, res)=>{
  const token = generateAccessToken({username: req.body.username})
  res.json(token);
});

