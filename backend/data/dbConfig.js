import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Post from '../models/Post.js';
import { users, posts } from './index.js';

dotenv.config();
const { MONGO_URL } = process.env;

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Access the collections once the connection is established
const db = mongoose.connection;
db.once('open', async () => {
    const postsCollection = db.collection('posts');
    const usersCollection = db.collection('users');
    
    // Check if collections already populated
    const postsCount = await postsCollection.countDocuments();
    const usersCount = await usersCollection.countDocuments();

    console.log(`BEFORE: ${postsCount}, ${usersCount}`)
    if(postsCount > 0 && usersCount > 0) {
        await Promise.all([
            postsCollection.drop(),
            usersCollection.drop()
        ]);
        // ADD DATA ONE TIME
        await Promise.all([
            User.insertMany(users),
            Post.insertMany(posts)
        ]);
        console.log(`AFTER1: ${await postsCollection.countDocuments()} ${await usersCollection.countDocuments()}`)
    } else if(postsCount === 0 && usersCount === 0) {
        await Promise.all([
            User.insertMany(users),
            Post.insertMany(posts)
        ]);
        console.log(`AFTER2: ${await postsCollection.countDocuments()} ${await usersCollection.countDocuments()}`)
    } else {
        console.log(`Nothing to drop and seed. Posts count: ${postsCount}. Users count: ${usersCount}`);
    };
});
