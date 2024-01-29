import express from 'express';
import * as authorController from '../controllers/author_controller.js';

const router = express.Router();

router.get('/',authorController.main_get);
router.get('/entry/create', authorController.entry_create_get);
router.post('/entry/create', authorController.entry_create_post);
router.get('/entries', authorController.entries);
router.put('/entry/:id/edit', authorController.entry_edit_put);
router.post('/entry/:title/delete', authorController.entry_delete_post);
router.get('/entry/publish', authorController.entry_publish_get);
router.put('/entry/:id/publish', authorController.entry_publish_put);
router.get('/entry/unpublish', authorController.entry_unpublish_get);
router.put('/entry/:id/unpublish', authorController.entry_unpublish_put);
router.get('/entry/:title/comments', authorController.entry_comments);
router.get('/entry/:title/comment/:id', authorController.entry_comment_delete_get);
router.post('/entry/:title/comment/:id', authorController.entry_comment_delete_post);

export default router;


