import mongoose from "mongoose";

  const Schema = mongoose.Schema;

const User = new Schema({
  user: String,
  password: String
});

export default mongoose.model('user', User);

