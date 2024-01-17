import express from 'express';
import * as reader from '../controllers/reader_controller';

const router = express.Router();

router.get('/', reader.main_get);
router.get('/entries', reader.entries_get);
router.get('/:title', reader.entry_get);
router.get('/:title/comment/add', reader.comment_add_get);
router.post('/:title/comment/add', reader.comment_add_post);
router.get('/:title/comments', reader.comments_get);
router.get('/:title/comment/:id/edit', reader.comment_edit_get);
router.post('/:title/comment/:id/edit', reader.comment_edit_post);
router.get('/:title/comment/:id/delete', reader.comment_delete_get);
router.post('/:title/comment/:id/delete', reader.comment_delete_post);

export default router;
