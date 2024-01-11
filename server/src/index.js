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

//Routes

import authorRouter from '../routes/author.js'
app.use('/author', authorRouter);

