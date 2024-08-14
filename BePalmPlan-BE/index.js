import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import server from './src/config/server.js';
import connectDB from './src/config/db.js';
import { locationSeeds } from './src/seeds/location.seed.js';

dotenv.config();

const PORT = 3000;

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Run the seed just one time to create the collection into the database
//locationSeeds();

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

