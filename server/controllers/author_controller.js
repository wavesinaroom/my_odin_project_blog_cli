import Entry from "../models/entry.js"
import Comment from "../models/comment.js"
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
            options: ['Create Post', 
                      'Edit Post', 
                      'Delete Post',
                      'Publish/Unpublish Post',
                      'Delete Comment',
                      'Quit']});
});

const entry_create_get = asyncHandler(async(req,res,next)=>{
  res.json({title: 'Please provide a title for your blogpost',
            body: 'Add body content with your text editor, you can publish it in the Publish/Unpublish menu'});
});

const entry_create_post = asyncHandler(async(req,res,next)=>{
  const blogpost = new Entry({
    title: req.body.title,
    date: new Date().toDateString(),
    text: req.body.text,
    is_published: false,
    comments: []
  })

  const publishedblog = await Entry.findOne({title: blogpost.title, text: blogpost.body});

  if(publishedblog){
    res.json({message: 'Title/body content already exists', options:['Main menu', 'Create new blogpost']});
    return;
  }
  await blogpost.save();
  res.json({message: 'Blogpost created', options:'Back to Main'});
});

const entries = asyncHandler(async(req,res,next)=>{
  const entries = await Entry.find({});
  res.json({list: entries, options: 'Back to Main'});
});

const entry_edit_put = asyncHandler(async(req,res,next)=>{
  await Entry.findByIdAndUpdate({_id: req.params.id}, {title: req.body.title, text: req.body.text});
  res.json({message: 'Blogpost updated', options:['Back to main menu', 'Back to blogpost list']});
});

const entry_delete_post = asyncHandler(async(req,res,next)=>{
  await Entry.findOneAndDelete({title: titleCleaner(req.params.title)});
  res.json({message: `${titleCleaner(req.params.title)} blogpost has been removed`, options: 'Back to blogpost list'});
});

const entry_publish_get = asyncHandler(async(req,res,next)=>{
  const unpublished = await Entry.find({is_published: false});
  res.json({message: `Please choose a blogpost to publish`, list: unpublished, options: 'Back to blogpost list'});
});

const entry_publish_put = asyncHandler(async(req,res,next)=>{
  await Entry.findByIdAndUpdate({_id: req.params.id}, {is_published: true});
  const {title} = await Entry.findById({_id:req.params.id});
  res.json({message: `${title} blogpost has been published`, options: 'Back to blogpost list'});
});

const entry_unpublish_get = asyncHandler(async(req,res,next)=>{
  const unpublished = await Entry.find({is_published: true});
  res.json({message: `Please choose a blogpost to publish`, list: unpublished, options: 'Back to blogpost list'});
});

const entry_unpublish_put = asyncHandler(async(req,res,next)=>{
  await Entry.findByIdAndUpdate({_id: req.params.id}, {is_published: false});
  const {title} = await Entry.findById({_id:req.params.id});
  res.json({message: `${title} blogpost has been unpublished`, options:'Back to blogpost list'});
});

const entry_comments = asyncHandler(async(req,res,next)=>{
  const list = await Entry.findOne({title: titleCleaner(req.params.title)}, {comments: 1}).populate('comments');
  res.json(list);
});

const entry_comment_delete_get = asyncHandler(async(req,res,next)=>{
  const comment = Comment.findById(req.params._id);
  res.json({message: `Are you sure you want to delete this comment?`, comment: comment, options:'Back to comments'});
});

const entry_comment_delete_post = asyncHandler(async(req,res,next)=>{
  await Entry.findOneAndUpdate({title: titleCleaner(req.params.title), $pull:{comments: req.params.id}})
  await Comment.findByIdAndDelete(req.params.id);
  res.json({message: `Your comment has been removed`, options:'Back to comments'});
});


export {main_get,
        entry_create_get,
        entry_create_post,
        entries,
        entry_edit_put,
        entry_delete_post,
        entry_publish_get,
        entry_publish_put,
        entry_unpublish_get,
        entry_unpublish_put,
        entry_comments,
        entry_comment_delete_get,
        entry_comment_delete_post};
