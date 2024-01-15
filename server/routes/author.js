import express from 'express';
import * as authorController from '../controllers/author_controller';

const router = express.Router();

router.get('/',authorController.author_main_get);
router.get('/entry/create', authorController.author_entry_create_get);
router.post('/entry/create', authorController.author_entry_create_post);
router.get('/entries', authorController.author_entries);
router.get('/entry/:title/edit', authorController.author_entry_edit_get);
router.put('/entry/:id/edit', authorController.author_entry_edit_put);
router.get('/entry/:title/delete', authorController.author_entry_delete_get);
router.post('/entry/:title/delete', authorController.author_entry_delete_post);
router.get('/entry/:title/publish', authorController.author_entry_publish_get);
router.put('/entry/:id/publish', authorController.author_entry_publish_post);
router.get('/entry/:title/comments', authorController.author_entry_comments);
router.get('/entry/:title/comment/:id', authorController.author_entry_comment_delete_get);
router.post('/entry/:title/comment/:id', authorController.author_entry_comment_delete_post);

module.exports = router;


