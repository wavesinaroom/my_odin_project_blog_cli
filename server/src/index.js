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
  hash.on('readable', async()=>{
    const data = hash.read();
    if(data){
      const user = await User.findOne({username:'author', password: data.toString('hex')})
      if(user)
        res.sendStatus(200)
      else
        res.sendStatus(401);
    }
  });
  hash.write(req.body.password);
  hash.end();
}))
