import Entry from "../models/entry.js";
import Comment from "../models/comment.js";
import asyncHandler from "express-async-handler";

const main_get = asyncHandler(async(req,res,next)=>{
  res.json({title: 'Main Menu',
            description: 'Welcome to Blog CLI, please select an option',
            options: ['Read a post',
                      'Comments',
                      'Quit']})
});

const entries_get = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Reader entries list GET');
});

const entry_get = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Reader entry GET');
});

const comments_get = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Comments GET');
});

const comment_add_get = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Add comment GET');
});

const comment_add_post = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Add comment POST');
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

