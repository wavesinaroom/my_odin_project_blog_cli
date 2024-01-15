import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Entry = new Schema({
  title: String,
  date: Date,
  text: String,
  is_published: Boolean,
  comments: [{type: Schema.Types.ObjectId, ref: "comment"}] 
})

export default mongoose.model('blogpost', Entry);
