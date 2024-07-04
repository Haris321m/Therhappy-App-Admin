import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import yogaPoseRoutes from './routes/yoga.route.js';
import topicRoutes from './routes/topic.route.js';
import questionRoutes from './routes/quiz.route.js';
import journalEntryRoutes from './routes/journal.route.js';
import moodRoutes from './routes/mode.route.js';
import post from './routes/post.route.js';
import Audio from './routes/audio.route.js';
import cors from 'cors';
import path from 'path';
import subscriptionroute from "./routes/subscription.route.js";
import { v2 as cloudinary } from 'cloudinary';
import Article from './routes/article.route.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(path.dirname(''), 'views'));
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/yoga-poses', yogaPoseRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/journal-entries', journalEntryRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/post', post);
app.use('/api/subscription', subscriptionroute);
app.use('/api/article',Article);
app.use('/api/audio',Audio);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
    socketTimeoutMS: 45000,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
