import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';
import 'dotenv/config';
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.static('uploads'));

app.use('/posts', routes);

app.use((_, res) => res.status(404).send());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
