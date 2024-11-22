import connectMongo from '../config/dbConnection.js';
import { ObjectId } from 'mongodb';
import 'dotenv/config';

const { MONGO_URI, MONGO_DB, COLLECTION_NAME } = process.env;

const mongoClient = await connectMongo(MONGO_URI);

export default async function getAllPosts() {
  const db = mongoClient.db(MONGO_DB);
  const collection = db.collection(COLLECTION_NAME);

  return await collection.find({}).toArray();
}

export async function getPostById(id) {
  const db = mongoClient.db(MONGO_DB);
  const collection = db.collection(COLLECTION_NAME);

  return await collection.findOne({ _id: new ObjectId(id) });
}

export async function createNewPost(post) {
  const db = mongoClient.db(MONGO_DB);
  const collection = db.collection(COLLECTION_NAME);

  return await collection.insertOne(post);
}

export async function updatePostById(id, post) {
  const db = mongoClient.db(MONGO_DB);
  const collection = db.collection(COLLECTION_NAME);

  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: post });
}

export async function deletePostById(id) {
  const db = mongoClient.db(MONGO_DB);
  const collection = db.collection(COLLECTION_NAME);

  return await collection.deleteOne({ _id: new ObjectId(id) });
}
