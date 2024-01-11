import express from 'express';
import * as authorController from '../controllers/author_controller';

const router = express.Router();

router.get('/new_entry', authorController.author_entry_create_get);

module.exports = router;


