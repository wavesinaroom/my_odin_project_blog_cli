import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

//Set up
const app = express();

app.listen(3000, ()=>{
  console.log("App listening on port 3000!");
});

main().catch(err => console.log(err));

async function main(){
  await mongoose.connect(process.env.MONGODB_URI)
}
app.use(express.json());
//Routes

import authorRouter from '../routes/author.js'
import readerRouter from '../routes/reader.js'

app.use('/author', authorRouter);
app.use('/reader', readerRouter);

//Login
import crypto from 'crypto';
import User from '../models/user.js'
const hash = crypto.createHash('sha256');


app.post('/login',asyncHandler(async (req,res,next)=>{
  hash.on('readable', ()=>{
    const data = hash.read();
    if(data){
      User.findOne({username:'author', password: data.toString('hex')})
        .then((user)=>{
          if(user)
            res.redirect('/author');
          else
            res.send('Invalid password')
        })
        .catch((err)=>{
          if(err)
            res.send('Could not log you in, please try again');
        })
    }
  });
  hash.write('password1234');
  hash.end();
}))
