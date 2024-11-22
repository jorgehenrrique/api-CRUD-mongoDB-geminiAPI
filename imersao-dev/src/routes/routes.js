import express from 'express';
import multer from 'multer';
import {
  createPost,
  deletePost,
  listAllPosts,
  listPostById,
  updatePost,
  uploadImage,
} from '../controllers/postControlers.js';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', listAllPosts);

router.get('/:id', listPostById);

router.post('/', createPost);

router.post('/upload', upload.single('image'), uploadImage);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;
