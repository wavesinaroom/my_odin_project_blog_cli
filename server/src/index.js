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

app.use(express.json());
//Routes

import authorRouter from '../routes/author.js';
app.use('/author', authorRouter);

import readerRouter from '../routes/reader.js';
app.use('/reader', readerRouter);
