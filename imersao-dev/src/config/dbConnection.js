import { MongoClient } from 'mongodb';

export default async function connectMongo(mongoUri) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(mongoUri);
    console.log('Connecting to MongoDB');
    await mongoClient.connect();
    console.log('Connected to MongoDB');

    return mongoClient;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit();
  }
}
