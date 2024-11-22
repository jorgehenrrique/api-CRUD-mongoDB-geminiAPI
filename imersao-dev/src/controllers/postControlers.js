import fs from 'fs';
import { ObjectId } from 'mongodb';
import getAllPosts, {
  createNewPost,
  deletePostById,
  getPostById,
  updatePostById,
} from '../models/postModel.js';
import gerarDescricaoComGemini from '../services/geminiService.js';

export async function listAllPosts(req, res) {
  // O status 200 é o padrão quando uma resposta é enviada com sucesso então não é necessário definir explicitamente aqui
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function listPostById(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid ID' });

  try {
    const post = await getPostById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function createPost(req, res) {
  const post = req.body;

  if (!post.description || !post.imgUrl || !post.alt)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const newPost = await createNewPost(post);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function uploadImage(req, res) {
  const image = req.file;
  const newImage = {
    description: 'Nova imagem',
    imgUrl: image.originalname,
    alt: 'Descricao da nova imagem',
  };

  try {
    const newPost = await createNewPost(newImage);
    const updatedImage = `uploads/${newPost.insertedId}.png`;
    fs.renameSync(image.path, updatedImage);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const urlImage = `http://localhost:${process.env.PORT}/${id}.png`;

  const post = {
    description: req.body.description,
    imgUrl: urlImage,
    alt: req.body.alt,
  };

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await gerarDescricaoComGemini(imgBuffer);
    post.description = description;

    const updatedPost = await updatePostById(id, post);
    res.status(200).json({ updatedPost, post });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid ID' });

  try {
    const deletedPost = await deletePostById(id);
    res.status(200).json({ deletedPost });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
