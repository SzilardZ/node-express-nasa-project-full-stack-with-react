import http from 'http';
import mongoose from 'mongoose';

import app from './app.js';
import { loadPlanetsData } from './models/planets.model.js';

const PORT = process.env.PORT || 8000;

const MONGO_URL = `mongodb+srv://nasa-api:KmBwJz2VhjLaaj0n@nasacluster.zllqcbs.mongodb.net/?retryWrites=true&w=majority`;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection is ready!');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
