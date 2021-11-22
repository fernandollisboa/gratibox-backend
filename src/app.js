import express from 'express';
import cors from 'cors';
import signup from './controllers/signup.js';
import login from './controllers/login.js';
import auth from './middlewares/auth.js';
import {
  postSubscription,
  getSubscription,
} from './controllers/subscription.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', signup);
app.post('/login', login);
app.post('/signature', auth, postSubscription);
app.get('/signature', auth, getSubscription);

export default app;
