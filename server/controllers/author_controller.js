import Entry from "../models/entry.js"
import asyncHandler from "express-async-handler";

function titleCleaner(string){
  let cleanedTitle = string.split('');
  for(let i = 0; i<cleanedTitle.length; i++){
    if(cleanedTitle[i]==='-')
      cleanedTitle[i] = ' ';
  }
  return cleanedTitle.join('');
}

const author_main_get = asyncHandler(async(req,res,next)=>{
  res.json({title: 'Main Menu',
            description: 'Welcome to Blog CLI, please select an option',
            options: ['Create Post', 
                      'Edit Post', 
                      'Delete Post',
                      'Publish/Unpublish Post',
                      'Delete Comment',
                      'Quit']});
});

const author_entry_create_get = asyncHandler(async(req,res,next)=>{
  res.json({instructions_title: 'Please provide a title for your blogpost',
            instructions_body: 'Add body content with your text editor, you can publish it in the Publish/Unpublish menu'});
});

const author_entry_create_post = asyncHandler(async(req,res,next)=>{
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
  res.json({message: 'Blogpost created'});
});

const author_entries = asyncHandler(async(req,res,next)=>{
  const entries = await Entry.find({});
  res.json({list: entries});
});

const author_entry_edit_get = asyncHandler(async(req,res,next)=>{
  const entry = await Entry.findOne({title: titleCleaner(req.params.title)});
  res.json({title: entry.title, text: entry.text, date: entry.date, edit_title: false, edit_text: false});
});

const author_entry_edit_put = asyncHandler(async(req,res,next)=>{
  await Entry.findByIdAndUpdate({_id: req.params.id}, {title: req.body.title, text: req.body.text});
  res.json({message: 'Blogpost updated', options:['Back to main menu', 'Back to blogpost list']});
});

const author_entry_delete_get = asyncHandler(async(req,res,next)=>{
  res.json({message: `Are you sure you want to delete your blogpost ${titleCleaner(req.params.title)}?`, title: req.params.title});
});

const author_entry_delete_post = asyncHandler(async(req,res,next)=>{
  await Entry.findOneAndDelete({title: titleCleaner(req.params.title)});
  res.json({message: `${titleCleaner(req.params.title)} blogpost has been removed`});
});

const author_entry_publish_get = asyncHandler(async(req,res,next)=>{
  const unpublished = await Entry.find({unpublished: false});
  res.json({message: `Please choose a blogpost to publish`, unpublished: unpublished} );
});

const author_entry_publish_put = asyncHandler(async(req,res,next)=>{
  await Entry.findByIdAndUpdate({_id: req.params.id}, {is_published: true});
  const {title} = await Entry.findById({_id:req.params.id});
  res.json({message: `${title} blogpost has been published`});
});

const author_entry_unpublish_get = asyncHandler(async(req,res,next)=>{
  const unpublished = await Entry.find({unpublished: true});
  res.json({message: `Please choose a blogpost to publish`, unpublished: unpublished} );
});

const author_entry_unpublish_put = asyncHandler(async(req,res,next)=>{
  await Entry.findByIdAndUpdate({_id: req.params.id}, {is_published: false});
  const {title} = await Entry.findById({_id:req.params.id});
  res.json({message: `${title} blogpost has been unpublished`});
});

const author_entry_comments = asyncHandler(async(req,res,next)=>{
  const list = await Entry.find({title: titleCleaner(req.params.title)}, {comments: 1, title: 1});
  res.json({list:list});
});

const author_entry_comment_delete_get = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry comments GET');
});

const author_entry_comment_delete_post = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry comments POST');
});


export {author_main_get,
        author_entry_create_get,
        author_entry_create_post,
        author_entries,
        author_entry_edit_get,
        author_entry_edit_put,
        author_entry_delete_get,
        author_entry_delete_post,
        author_entry_publish_get,
        author_entry_publish_put,
        author_entry_unpublish_get,
        author_entry_unpublish_put,
        author_entry_comments,
        author_entry_comment_delete_get,
        author_entry_comment_delete_post};
