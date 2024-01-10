import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.listen(3000, ()=>{
  console.log("Example app listening on port 3000!");
});

main().catch(err => console.log(err));

async function main(){
  await mongoose.connect(process.env.MONGODB_URI)
}

app.get("/home", (req,res)=>{
  res.send("Client runs fine")
})

