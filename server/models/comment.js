import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Comment = new Schema({
  user: String,
  date: Date,
  text: String,
});

export default mongoose.model('comment', Comment);
