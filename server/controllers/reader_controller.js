import Entry from "../models/entry.js";
import Comment from "../models/comment.js";
import asyncHandler from "express-async-handler";

function titleCleaner(string){
  let cleanedTitle = string.split('');
  for(let i = 0; i<cleanedTitle.length; i++){
    if(cleanedTitle[i]==='-')
      cleanedTitle[i] = ' ';
  }
  return cleanedTitle.join('');
}

const main_get = asyncHandler(async(req,res,next)=>{
  res.json({title: 'Main Menu',
            description: 'Welcome to Blog CLI, please select an option',
            options: ['Read a post',
                      'Comments',
                      'Quit']})
});

const entries_get = asyncHandler(async(req,res,next)=>{
  const list = await Entry.find({});
  res.json({list:list});
});

const entry_get = asyncHandler(async(req,res,next)=>{
  const entry = await Entry.find({title: titleCleaner(req.params.title)});
  res.json({entry: entry});
});

const comments_get = asyncHandler(async(req,res,next)=>{
  const comments = await Entry.find({title: titleCleaner(req.params.title)}, {comments: 1});
  res.json({comments: comments});
});

const comment_add_get = asyncHandler(async(req,res,next)=>{
  res.json({message: `Please add a comment to ${titleCleaner(req.params.title)}, don't forget your username before submission`});
});

const comment_add_post = asyncHandler(async(req,res,next)=>{
  const comment = new Comment({
    user: req.body.user,
    date: new Date().toDateString(),
    text: req.body.text 
  });

  const publishedComment = await Comment.findOne({text: comment.text})
  if(publishedComment){
    res.json({message: 'Comment has been already published', options:['Main Menu', 'New comment']});
    return;
  }

  await comment.save();
  await Entry.findOneAndUpdate({title: titleCleaner(req.params.title), $push:{comments: comment}});
  res.json({message: `Your comment has been submitted!`, options: ['Back to Main', 'Back to comments']});
});

const comment_edit_get = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Edit comment GET');
});

const comment_edit_post = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED; Edit comment POST');
});

const comment_delete_get = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Delete comment GET');
});

const comment_delete_post = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Delete comment POST');
});

export{ main_get,
        entries_get,
        entry_get,
        comment_add_get,
        comment_add_post,
        comment_edit_get,
        comment_edit_post,
        comment_delete_get,
        comment_delete_post,
        comments_get}

