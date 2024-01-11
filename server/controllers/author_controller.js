import asyncHandler from "express-async-handler";

const author_main_get = asyncHandler(async(req,res,next)=>{
  res.json({title: 'Main Menu',
            description: 'Welcome to Blog CLI, please select an option',
            options: ['Create Post', 
                      'Edit Post', 
                      'Delete Post',
                      'Publish/Unpublish Post',
                      'Delete Comment']});
});

const author_entry_create_get = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry create GET');
});

const author_entry_create_post = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry  create POST');
});

const author_entries_edit = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry list');
});

const author_entries_delete = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry list for deleting')
});

const author_entry_edit_get = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry edit GET');
});

const author_entry_edit_put = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry edit POST');
});

const author_entry_delete_get = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry delete GET');
});

const author_entry_delete_post = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry delete POST')
});

const author_entry_publish_get = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry publish GET');
});

const author_entry_publish_post = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry publish POST');
});

const author_entry_comments = asyncHandler(async(req,res,next)=>{
  res.send('NOT IMPLEMENTED: Author entry comments GET');
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
        author_entries_edit,
        author_entries_delete,
        author_entry_edit_get,
        author_entry_edit_put,
        author_entry_delete_get,
        author_entry_delete_post,
        author_entry_publish_get,
        author_entry_publish_post,
        author_entry_comments,
        author_entry_comment_delete_get,
        author_entry_comment_delete_post};
