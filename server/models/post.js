import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Post = new Schema({
  title: String,
  date: Date,
  text: String,
  is_published: Boolean,
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}] 
})
